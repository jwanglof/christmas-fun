import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {faDiceFive, faDiceFour, faDiceOne, faDiceSix, faDiceThree, faDiceTwo} from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {FirestoreService} from '../services/firebase/firestore.service';
import {FirestoreGame} from '../services/firebase/models/game';
import {SessionStorageKeys, SessionStorageService} from '../services/session-storage.service';
import {DiceService} from '../services/dice.service';


@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements OnChanges {
  @Input() gameData!: FirestoreGame;
  @Output() looseGiftEvent$: EventEmitter<number> = new EventEmitter<number>();
  @Output() takeGiftEvent$: EventEmitter<number> = new EventEmitter<number>();

  diceValues: { [key: number]: IconDefinition; } = {
    1: faDiceOne,
    2: faDiceTwo,
    3: faDiceThree,
    4: faDiceFour,
    5: faDiceFive,
    6: faDiceSix
  };

  currentDiceNumber = 1;
  itsMyTurn = false;
  itsMyTurnWaiting = false;
  itsMyTurnWaitingText: string | null = null;
  allowedToTakeGift = false;
  allowedToLooseGift = false;
  previousPlayerName: string | null = null;

  currentTurnPlayerName: string | null = null;

  constructor(
    private firestoreService: FirestoreService,
    private sessionStorageService: SessionStorageService,
    private diceService: DiceService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const {currentDiceRolledPlayerUid, currentDiceNumber, waitUntilPreviousPlayerIsDone, previousPlayerUid} = this.gameData.dice;

    this.currentDiceNumber = currentDiceNumber;

    // Reset all view variables
    this.itsMyTurn = this._isItMyTurn();
    this.itsMyTurnWaiting = waitUntilPreviousPlayerIsDone;
    this.allowedToTakeGift = false;
    this.allowedToLooseGift = false;
    this.currentTurnPlayerName = null;
    this.previousPlayerName = null;
    this.itsMyTurnWaitingText = null;

    if (waitUntilPreviousPlayerIsDone && !this._previousPlayerWasMe()) {
      // Waiting on previous player to make a move
      this._setWaitingText();
      const prevPlayer = this.gameData.players.find(player => player.uid === previousPlayerUid);
      if (prevPlayer) {
        console.log('Waiting on previous player to make a move 222', prevPlayer);
        this.previousPlayerName = prevPlayer.name;
      } else {
        this.previousPlayerName = 'Okänd';
      }
      return;
    } else if (waitUntilPreviousPlayerIsDone) {
      // Waiting for me to make a move
      if (currentDiceNumber === DiceService.DICE_NUMBER_TAKE_GIFT) {
        // My turn and I will take a gift
        this._checkIfICanTakeAGift(currentDiceNumber);
      } else if (currentDiceNumber === DiceService.DICE_NUMBER_LOOSE_GIFT) {
        // My turn and I will loose a gift
        this._checkIfICanLooseAGift(currentDiceNumber);
      }
      return;
    }

    if (!this.itsMyTurn) {
      this.allowedToTakeGift = false;
      this.allowedToLooseGift = false;
      const currentTurnPlayer = this.gameData.players.find(player => player.uid === currentDiceRolledPlayerUid);
      if (currentTurnPlayer) {
        this.currentTurnPlayerName = currentTurnPlayer.name;
      }
    }
  }

  private _setWaitingText(): void {
    const {currentDiceNumber} = this.gameData.dice;

    if (currentDiceNumber === DiceService.DICE_NUMBER_LOOSE_GIFT) {
      this.itsMyTurnWaitingText = 'ge bort en present';
    } else if (currentDiceNumber === DiceService.DICE_NUMBER_TAKE_GIFT) {
      this.itsMyTurnWaitingText = 'ta en present';
    }
  }

  private _checkIfICanTakeAGift(diceNumber: number): void {
    // Can take a gift IF there are gift in the "pool" OR if any other players have gifts!
    if (!this._canITakeAGift()) {
      this.firestoreService.resetDicePreviousPlayerValues(this.gameData.name);
    }

    this.allowedToTakeGift = true;
    this.takeGiftEvent$.emit(diceNumber);
  }

  private _checkIfICanLooseAGift(diceNumber: number): void {
    // Only send this event IF the current user have any gifts
    if (!this._canILooseAGift()) {
      this.firestoreService.resetDicePreviousPlayerValues(this.gameData.name);
      return;
    }

    this.allowedToLooseGift = true;
    this.looseGiftEvent$.emit(diceNumber);
  }

  private _canITakeAGift(): boolean {
    const myUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
    const giftsInPool = this.gameData.gifts.some(g => g.belongsTo === null);

    // Can only take a gift if there are gifts in the pool if the extended game has started
    if (this.gameData.extendedGameStarted) {
      return giftsInPool;
    }

    const giftsExistOnOtherPlayers = this.gameData.gifts.some(g => g.belongsTo !== myUid && g.belongsTo !== null);
    return giftsInPool || giftsExistOnOtherPlayers;
  }

  private _canILooseAGift(): boolean {
    // Can never loose a gift if the extended game has started
    if (this.gameData.extendedGameStarted) {
      return false;
    }
    const myUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
    const myGifts = this.gameData.gifts.filter(gift => gift.belongsTo === myUid);
    return myGifts.length > 0;
  }

  private _previousPlayerWasMe(): boolean {
    const {previousPlayerUid} = this.gameData.dice;
    if (!previousPlayerUid) {
      return false;
    }
    return this.sessionStorageService.keyValueIsEqualValue(SessionStorageKeys.KEY_PLAYER_UID, previousPlayerUid);
  }

  private _isItMyTurn(): boolean {
    const {currentDiceRolledPlayerUid} = this.gameData.dice;
    if (!currentDiceRolledPlayerUid) {
      return false;
    }
    return this.sessionStorageService.keyValueIsEqualValue(
      SessionStorageKeys.KEY_PLAYER_UID,
      currentDiceRolledPlayerUid);
  }

  private _sendChangeDiceNumber(diceNumber: number, otherPlayersMustWaitForMe: boolean): void {
    this.firestoreService.changeDiceNumber(this.gameData.name, diceNumber, otherPlayersMustWaitForMe)
      .subscribe(() => {
        console.log('New diceNumber:', diceNumber);
      }, console.error);
  }

  diceClick(): void {
    const {waitUntilPreviousPlayerIsDone} = this.gameData.dice;
    if (this.itsMyTurn && !waitUntilPreviousPlayerIsDone) {
      this.itsMyTurn = false;
      const newDiceNumber = this.diceService.getNewDiceNumber();

      let otherPlayersMustWaitForMe = false;
      if (newDiceNumber === DiceService.DICE_NUMBER_TAKE_GIFT) {
        otherPlayersMustWaitForMe = this._canITakeAGift();
      } else if (newDiceNumber === DiceService.DICE_NUMBER_LOOSE_GIFT) {
        otherPlayersMustWaitForMe = this._canILooseAGift();
      }

      this._sendChangeDiceNumber(newDiceNumber, otherPlayersMustWaitForMe);
    }
  }
}
