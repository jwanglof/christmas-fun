import {Component, Input, OnChanges} from '@angular/core';
import {FirestoreService} from '../../services/firebase/firestore.service';
import {SessionStorageKeys, SessionStorageService} from '../../services/session-storage.service';
import {FirestoreGame} from '../../services/firebase/models/game';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnChanges {
  @Input() gameData!: FirestoreGame;

  nameValue = '';
  disabled = false;

  constructor(
    private firestoreService: FirestoreService,
    private sessionStorageService: SessionStorageService,
  ) { }

  ngOnChanges(): void {
    this._checkIfPlayerIsSet();
  }

  onSubmit(): void {
    this.firestoreService.addNewPlayerToGame(this.gameData.name, this.nameValue).subscribe(playerData => {
      this.sessionStorageService.setValue(SessionStorageKeys.KEY_PLAYER_UID, playerData.uid);
      this.nameValue = '';
    });
  }

  private _checkIfPlayerIsSet(): void {
    if (this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID) !== null) {
      this.disabled = true;
    }
  }
}
