import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from '../../../services/firebase/storage.service';
import {FirestoreGame} from '../../../services/firebase/models/game';
import {FirestoreService} from '../../../services/firebase/firestore.service';
import {SessionStorageKeys, SessionStorageService} from '../../../services/session-storage.service';

@Component({
  selector: 'app-upload-gift-form',
  templateUrl: './upload-gift-form.component.html',
  styleUrls: ['./upload-gift-form.component.scss']
})
export class UploadGiftFormComponent implements OnInit {
  @Input() gameData!: FirestoreGame;

  giftName = '';
  file: File | null = null;

  constructor(
    private storageService: StorageService,
    private firestoreService: FirestoreService,
    private sessionStorageService: SessionStorageService,
  ) { }

  ngOnInit(): void {
    console.log(333, this.file);
  }

  submit(): void {
    if (this.file) {
      console.log('Submit', this.file, this.gameData, this.giftName);
      this.storageService.uploadPicture(this.gameData.name, this.giftName, this.file)
        .subscribe((fileName) => {
          console.log('SUCCESS!', fileName);
          const gameName = this.gameData.name;
          const ownerPlayerUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
          // tslint:disable-next-line:no-non-null-assertion
          this.firestoreService.addGiftToGame(gameName, ownerPlayerUid!, fileName, this.giftName)
            .subscribe(() => {
              console.log('Add gift done!');
            }, console.error);
        }, console.error);
    }
  }

  onFileChange(files: File[]): void {
    console.log(1111, files);
    this.file = files[0];
  }
}
