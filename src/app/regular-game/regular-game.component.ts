import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirestoreService} from '../services/firebase/firestore.service';
import {FirestoreGame, FirestoreGamePlayer} from '../services/firebase/models/game';
import {faSnowflake} from '@fortawesome/free-solid-svg-icons';
import {SessionStorageKeys, SessionStorageService} from '../services/session-storage.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RulesModalComponent} from '../rules/rules-modal.component';

@Component({
  selector: 'app-regular-game',
  templateUrl: './regular-game.component.html',
  styleUrls: ['./regular-game.component.scss']
})
export class RegularGameComponent implements OnInit {
  // TODO Rename to game-engine
  gameName = '';
  gameData: FirestoreGame | undefined;
  gamePlayersFirstHalf: (FirestoreGamePlayer | null)[] = [];
  gamePlayersSecondHalf: (FirestoreGamePlayer | null)[] = [];

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
          console.log('GAME HAS STARTED! SHOW THE DICE!');
          this.showTheDice = true;
        } else if (data.started && data.ended) {
          console.log('GAME HAS ENDED! HIDE THE DICE!');
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
