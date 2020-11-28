import {Component, Input, OnInit} from '@angular/core';
import {FirestoreService} from '../../services/firebase/firestore.service';
import {SessionStorageKeys, SessionStorageService} from '../../services/session-storage.service';
import {FirestoreGame} from '../../services/firebase/models/game';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {
  @Input() gameData!: FirestoreGame;

  nameValue = '';
  disabled = false;

  constructor(
    private firestoreService: FirestoreService,
    private sessionStorageService: SessionStorageService,
  ) { }

  ngOnInit(): void {
    if (this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID) !== null) {
      this.disabled = true;
    }
  }

  onSubmit(): void {
    this.firestoreService.addNewPlayerToGame(this.gameData.name, this.nameValue).subscribe(playerData => {
      this.sessionStorageService.setValue(SessionStorageKeys.KEY_PLAYER_UID, playerData.uid);
    });
  }

}
