import {Component, OnInit} from '@angular/core';
import {FirestoreService} from '../services/firebase/firestore.service';
import {Router} from '@angular/router';
import {SessionStorageKeys, SessionStorageService} from '../services/session-storage.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GoToStartedGameModalComponent} from './go-to-started-game-modal/go-to-started-game-modal.component';

@Component({
  selector: 'app-hej',
  templateUrl: './hej.component.html',
  styleUrls: ['./hej.component.scss']
})
export class HejComponent implements OnInit {
  gameNameValue = '';
  gameInvalid = false;

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this._checkIfPlayerHasAStartedGame();
  }

  goToGameName(): void {
    const gameNameTrimmed = this.gameNameValue.trim();
    this.firestoreService.getGame(gameNameTrimmed).subscribe(() => {
      this.sessionStorageService.setValue(SessionStorageKeys.KEY_GAME_UID, gameNameTrimmed);
      this.router.navigate([`game/${gameNameTrimmed}`]);
    }, err => {
      console.error(err);
    });
  }

  private _checkIfPlayerHasAStartedGame(): void {
    if (this.sessionStorageService.getValue(SessionStorageKeys.KEY_GAME_UID) !== null) {
      const modalRef = this.modalService.open(GoToStartedGameModalComponent, {backdrop: 'static'});
      modalRef.componentInstance.gameName = this.sessionStorageService.getValue(SessionStorageKeys.KEY_GAME_UID);
    }
  }
}
