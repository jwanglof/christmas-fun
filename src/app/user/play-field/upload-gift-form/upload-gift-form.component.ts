import {Component, Input} from '@angular/core';
import {StorageService} from '../../../services/firebase/storage.service';
import {FirestoreGame} from '../../../services/firebase/models/game';
import {FirestoreService} from '../../../services/firebase/firestore.service';
import {SessionStorageKeys, SessionStorageService} from '../../../services/session-storage.service';
import {faSnowflake} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-upload-gift-form',
  templateUrl: './upload-gift-form.component.html',
  styleUrls: ['./upload-gift-form.component.scss']
})
export class UploadGiftFormComponent {
  @Input() gameData!: FirestoreGame;
  faSnowflake = faSnowflake;
  giftName = '';
  file: File | null = null;
  loading = false;

  constructor(
    private storageService: StorageService,
    private firestoreService: FirestoreService,
    private sessionStorageService: SessionStorageService,
  ) { }

  submit(): void {
    if (this.file) {
      this.loading = true;

      this.storageService.uploadPicture(this.gameData.name, this.giftName, this.file)
        .subscribe((fileName) => {
          const gameName = this.gameData.name;
          const ownerPlayerUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
          // tslint:disable-next-line:no-non-null-assertion
          this.firestoreService.addGiftToGame(gameName, ownerPlayerUid!, fileName, this.giftName)
            .subscribe(() => {
              console.log('Add gift done!');
              this.loading = false;
            }, console.error);
        }, console.error);
    }
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.file = target.files[0];
    }
  }
}
