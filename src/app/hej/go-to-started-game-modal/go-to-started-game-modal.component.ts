import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SessionStorageKeys, SessionStorageService} from '../../services/session-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-go-to-started-game-modal',
  templateUrl: './go-to-started-game-modal.component.html',
  styleUrls: ['./go-to-started-game-modal.component.scss']
})
export class GoToStartedGameModalComponent {
  @Input() gameName = '';

  constructor(
    public activeModal: NgbActiveModal,
    private sessionStorageService: SessionStorageService,
    private router: Router,
  ) { }

  finishGame(): void {
    this.activeModal.close();
    this.sessionStorageService.deleteValue(SessionStorageKeys.KEY_GAME_UID);
    this.sessionStorageService.deleteValue(SessionStorageKeys.KEY_PLAYER_UID);
  }

  continueGame(): void {
    this.activeModal.close();
    this.router.navigate([`game/${this.gameName}`]);
  }
}
