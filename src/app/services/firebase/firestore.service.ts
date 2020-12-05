import {Injectable} from '@angular/core';
import firebase from 'firebase/app';
import {FirestoreGame, FirestoreGameDiceValues, FirestoreGameGift, FirestoreGamePlayer} from './models/game';
import {defer, from, Observable} from 'rxjs';
import {nanoid} from 'nanoid';
import {DiceService} from '../dice.service';
import {SessionStorageKeys, SessionStorageService} from '../session-storage.service';
import {FirebaseService} from './firebase.service';
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentData = firebase.firestore.DocumentData;
import QuerySnapshot = firebase.firestore.QuerySnapshot;

interface GameGameCache {
  firestoreId: string;
  firestoreRef: DocumentReference<DocumentData>;
}

interface GameCache {
  [key: string]: GameGameCache;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore: firebase.firestore.Firestore;
  private COLLECTION_GAME = 'game';

  private GAME_CACHE: GameCache = {};

  constructor(
    private diceService: DiceService,
    private sessionStorageService: SessionStorageService,
    private firebaseService: FirebaseService,
  ) {
    this.firestore = this.firebaseService.getFirebaseApp().firestore();
  }

  createNewGame(name: string): Observable<FirestoreGame> {
    const gameData: FirestoreGame = {
      name,
      created: Date.now(),
      updated: Date.now(),
      deleted: false,
      ended: false,
      started: false,
      lengthInSeconds: 600,
      dice: {
        currentDiceNumber: 1,
        currentDiceRolledPlayerUid: null,
        waitUntilPreviousPlayerIsDone: false,
        previousPlayerUid: null,
      },
      players: [],
      gifts: [],
    };

    return new Observable<FirestoreGame>(observer => {
      this.firestore.collection(this.COLLECTION_GAME).add(gameData)
        .then((docRef: DocumentReference<DocumentData>) => {
          this.GAME_CACHE[name] = {
            firestoreId: docRef.id,
            firestoreRef: docRef,
          };
          this.addGameToCache(gameData.name, docRef);
          observer.next(gameData);
        })
        .catch(err => observer.error(err));
    });
  }

  private addGameToCache(gameName: string, firebaseRef: DocumentReference<DocumentData>): void {
    this.GAME_CACHE[gameName] = {
      firestoreId: firebaseRef.id,
      firestoreRef: firebaseRef,
    };
  }

  getAllGames(): Observable<any> {
    return defer(() => from(this.firestore.collection(this.COLLECTION_GAME)
      .where('ended', '==', false)
      .get()));
  }

  getGame(gameName: string): Observable<GameGameCache> {
    return new Observable<GameGameCache>(observer => {
      this.firestore.collection(this.COLLECTION_GAME)
        .where('name', '==', gameName)
        .limit(1)
        .get()
        .then((snapshot: QuerySnapshot<DocumentData>) => {
          snapshot.forEach((docData: DocumentData) => {
            this.addGameToCache(docData.data().name, this.firestore.collection(this.COLLECTION_GAME).doc(docData.id));
            observer.next(this.GAME_CACHE[gameName]);
          });
        })
        .catch(err => observer.error(err));
    });
  }

  addNewPlayerToGame(gameName: string, playerName: string): Observable<FirestoreGamePlayer> {
    if (gameName === null || playerName === null || this.GAME_CACHE[gameName] === null) {
      return new Observable<FirestoreGamePlayer>(observer => observer.error('Null values!'));
    }

    const playerData: FirestoreGamePlayer = {
      name: playerName,
      uid: nanoid(),
    };

    return new Observable<FirestoreGamePlayer>(observer => {
      observer.next(playerData);

      this.GAME_CACHE[gameName].firestoreRef.update({
        players: firebase.firestore.FieldValue.arrayUnion(playerData)
      }).catch(err => observer.error(err));
    });
  }

  startGame(gameName: string): Observable<void> {
    if (gameName === null || this.GAME_CACHE[gameName] === null) {
      return new Observable<void>(observer => observer.error('Null values!'));
    }

    return new Observable<void>(observer => {
      this.GAME_CACHE[gameName].firestoreRef.get()
        .then((gameData: any) => {
          const diceValues: FirestoreGameDiceValues = {
            currentDiceRolledPlayerUid: gameData.data().players[1].uid,
            currentDiceNumber: this.diceService.getNewDiceNumber(),
            waitUntilPreviousPlayerIsDone: false,
            previousPlayerUid: null,
          };
          const newGameValues = {
            dice: diceValues,
            started: true
          };
          return this.GAME_CACHE[gameName].firestoreRef.update(newGameValues);
        })
        .then(() => observer.next())
        .catch(err => observer.error(err));
    });
  }

  endGame(gameName: string): Observable<any> {
    if (gameName === null || this.GAME_CACHE[gameName] === null) {
      return new Observable<FirestoreGamePlayer>(observer => observer.error('Null values!'));
    }

    const endedObject = {
      ended: true,
      'dice.currentDiceRolledPlayerUid': null
    };

    return new Observable<FirestoreGamePlayer>(observer => {
      this.GAME_CACHE[gameName].firestoreRef.update(endedObject)
        .then(() => {
          this.sessionStorageService.deleteValue(SessionStorageKeys.KEY_PLAYER_UID);
          this.sessionStorageService.deleteValue(SessionStorageKeys.KEY_GAME_UID);
          observer.next();
        })
        .catch(err => observer.error(err));
    });
  }

  changeDiceNumber(gameName: string, diceNumber: number, otherPlayersMustWaitForMe: boolean): Observable<number> {
    if (gameName === null || this.GAME_CACHE[gameName] === null) {
      return new Observable<number>(observer => observer.error('Null values!'));
    }

    return new Observable<number>(observer => {
      this.GAME_CACHE[gameName].firestoreRef.get()
        .then((gameData: any) => {
          const myUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
          const players = gameData.data().players;
          const myIndexInPlayerArray = players.findIndex((player: FirestoreGamePlayer) => {
            return player.uid === myUid;
          });
          const imTheLastPlayer = myIndexInPlayerArray === players.length - 1;
          let nextPlayerData = players[myIndexInPlayerArray + 1];
          if (imTheLastPlayer) {
            nextPlayerData = players[0];
          }

          const newDiceValues: FirestoreGameDiceValues = {
            currentDiceNumber: diceNumber,
            currentDiceRolledPlayerUid: nextPlayerData.uid,
            waitUntilPreviousPlayerIsDone: otherPlayersMustWaitForMe,
            previousPlayerUid: null,
          };
          if (otherPlayersMustWaitForMe) {
            newDiceValues.previousPlayerUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
          }
          console.log('newDiceValues:', newDiceValues);

          return this.GAME_CACHE[gameName].firestoreRef.update({dice: newDiceValues});
        })
        .then(() => {
          observer.next();
        })
        .catch(err => observer.error(err));
    });
  }

  resetDicePreviousPlayerValues(gameName: string): Observable<void> {
    if (gameName === null || this.GAME_CACHE[gameName] === null) {
      return new Observable<void>(observer => observer.error('Null values!'));
    }

    return new Observable<void>(observer => {
      this.GAME_CACHE[gameName].firestoreRef.get()
        .then(() => {
          const updateData = {
            'dice.previousPlayerUid': null,
            'dice.waitUntilPreviousPlayerIsDone': false,
          };
          return this.GAME_CACHE[gameName].firestoreRef.update(updateData);
        })
        .then(() => observer.next())
        .catch(err => observer.error(err));
    });
  }

  takeGift(gameName: string, giftUid: string): Observable<void> {
    if (gameName === null || giftUid === null || this.GAME_CACHE[gameName] === null) {
      return new Observable<void>(observer => observer.error('Null values!'));
    }

    return new Observable<void>(observer => {
      const myUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
      this.GAME_CACHE[gameName].firestoreRef.get()
        .then((gameData: any) => {
          const newGiftsValues = gameData.data().gifts.map((g: FirestoreGameGift) => {
            if (g.uid === giftUid) {
              g.belongsTo = myUid;
              return g;
            }
            return g;
          });

          const updateData = {
            gifts: newGiftsValues,
            'dice.previousPlayerUid': null,
            'dice.waitUntilPreviousPlayerIsDone': false,
          };
          return this.GAME_CACHE[gameName].firestoreRef.update(updateData);
        })
        .then(() => observer.next())
        .catch(err => observer.error(err));
    });
  }

  looseGift(gameName: string, giftUid: string): Observable<void> {
    if (gameName === null || giftUid === null || this.GAME_CACHE[gameName] === null) {
      return new Observable<void>(observer => observer.error('Null values!'));
    }

    return new Observable<void>(observer => {
      this.GAME_CACHE[gameName].firestoreRef.get()
        .then((gameData: any) => {
          const newGiftsValues = gameData.data().gifts.map((g: FirestoreGameGift) => {
            if (g.uid === giftUid) {
              g.belongsTo = null;
              return g;
            }
            return g;
          });

          const updateData = {
            gifts: newGiftsValues,
            'dice.previousPlayerUid': null,
            'dice.waitUntilPreviousPlayerIsDone': false,
          };
          return this.GAME_CACHE[gameName].firestoreRef.update(updateData);
        })
        .then(() => observer.next())
        .catch(err => observer.error(err));
    });
  }

  addGiftToGame(gameName: string, ownerPlayerUid: string, pictureName: string, title: string): Observable<void> {
    if (gameName === null || ownerPlayerUid === null || pictureName === null || title === null) {
      return new Observable<void>(observer => observer.error('Null values!'));
    }

    return new Observable<void>(observer => {
      const giftValue: FirestoreGameGift = {
        ownerPlayerUid,
        belongsTo: null,
        uid: nanoid(),
        pictureName,
        title
      };
      this.GAME_CACHE[gameName].firestoreRef.update({gifts: firebase.firestore.FieldValue.arrayUnion(giftValue)})
        .then(() => observer.next())
        .catch(err => observer.error(err));
    });
  }
}
