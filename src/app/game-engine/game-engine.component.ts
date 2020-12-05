import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirestoreService} from '../services/firebase/firestore.service';
import {FirestoreGame, FirestoreGamePlayer} from '../services/firebase/models/game';
import {faSnowflake} from '@fortawesome/free-solid-svg-icons';
import {SessionStorageKeys, SessionStorageService} from '../services/session-storage.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RulesModalComponent} from '../rules/rules-modal.component';

@Component({
  selector: 'app-game-engine',
  templateUrl: './game-engine.component.html',
  styleUrls: ['./game-engine.component.scss']
})
export class GameEngineComponent implements OnInit {
  gameName = '';
  gameData: FirestoreGame | undefined;
  gamePlayersFirstHalf: (FirestoreGamePlayer | null)[] = [];
  gamePlayersSecondHalf: (FirestoreGamePlayer | null)[] = [];

  looseGiftDiceNumbers: number[] = [];
  takeGiftDiceNumbers: number[] = [];

  faSnowflake = faSnowflake;

  thisIsFirstPlayer = false;
  showTheDice = false;
  showTheEndText = false;
  lengthInSeconds = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: FirestoreService,
    private sessionStorageService: SessionStorageService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    if (!this.activatedRoute.snapshot.paramMap.has('gameName')) {
      return;
    }

    // tslint:disable-next-line:no-non-null-assertion
    this.gameName = this.activatedRoute.snapshot.paramMap.get('gameName')!;

    this.firestore.getGame(this.gameName).subscribe(gameData => {
      gameData.firestoreRef.onSnapshot((doc: any) => {
        const data: FirestoreGame = doc.data();
        this.lengthInSeconds = data.lengthInSeconds;

        if (data.players.length) {
          this.thisIsFirstPlayer = this.sessionStorageService.keyValueIsEqualValue(SessionStorageKeys.KEY_PLAYER_UID, data.players[0].uid);
        }

        if (data.started && !data.ended) {
          this.showTheDice = true;
          this.showTheEndText = false;
        } else if (data.started && data.ended) {
          this.showTheDice = false;
          this.showTheEndText = true;
        }

        this.gamePlayersFirstHalf = this._getPlayerDataOrEmpty(data.players.slice(0, 4));
        this.gamePlayersSecondHalf = this._getPlayerDataOrEmpty(data.players.slice(4, 8));
        this.gameData = data;
      });
    }, err => {
      console.error(err);
    });
  }

  openRulesModal(): void {
    this.modalService.open(RulesModalComponent, {backdrop: 'static'});
  }

  onLooseGiftEvent(diceNumber: number): void {
    this.looseGiftDiceNumbers.push(diceNumber);
  }

  onTakeGiftEvent(diceNumber: number): void {
    this.takeGiftDiceNumbers.push(diceNumber);
  }

  private _getPlayerDataOrEmpty(players: FirestoreGamePlayer[]): (FirestoreGamePlayer | null)[] {
    if (players.length === 4) {
      return players;
    }
    const copyPlayers: (FirestoreGamePlayer | null)[] = [...players];
    for (let i = players.length, len = 4; i < len; i++) {
      copyPlayers[i] = null;
    }
    return copyPlayers;
  }
}
