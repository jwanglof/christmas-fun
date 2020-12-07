import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FirestoreGame, FirestoreGameGift} from '../../../services/firebase/models/game';
import {StorageService} from '../../../services/firebase/storage.service';
import {SessionStorageService} from '../../../services/session-storage.service';
import {FirestoreService} from '../../../services/firebase/firestore.service';
import {GameService} from '../../../services/game.service';

@Component({
  selector: 'app-player-gift',
  templateUrl: './player-gift.component.html',
  styleUrls: ['./player-gift.component.scss']
})
export class PlayerGiftComponent implements OnChanges {
  @Input() gift!: FirestoreGameGift;
  @Input() gameData!: FirestoreGame;
  @Input() looseGiftDiceNumbers: number[] = [];
  @Input() takeGiftDiceNumbers: number[] = [];

  giftDownloadUrl: string | undefined;
  allowedToTakeGift = false;
  allowedToLooseGift = false;
  buttonsDisabled = false;

  constructor(
    private storageService: StorageService,
    private sessionStorageService: SessionStorageService,
    private firestoreService: FirestoreService,
    private gameService: GameService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const {takeGiftDiceNumbers} = changes;
    const gameName = this.gameData.name;
    this.storageService.getPictureDownloadUrl(gameName, this.gift.pictureName)
      .subscribe(downloadUrl => {
        this.giftDownloadUrl = downloadUrl;
      }, console.error);

    if (takeGiftDiceNumbers.firstChange && takeGiftDiceNumbers.currentValue.length >= 0) {
      this._checkIfAllowedToTakeGift();
    } else if (takeGiftDiceNumbers.currentValue.length > takeGiftDiceNumbers.previousValue.length) {
      this._checkIfAllowedToTakeGift();
    }
  }

  private _checkIfAllowedToTakeGift(): void {
    this.allowedToTakeGift = this.gameService.allowedToTakeGift(this.gift, this.gameData);
    this.allowedToLooseGift = this.gameService.allowedToLooseGift(this.gift, this.gameData);
  }

  private _loadingStarted(): void {
    this.buttonsDisabled = true;
  }

  private _loadingFinished(): void {
    this.buttonsDisabled = true;
    this.allowedToLooseGift = false;
    this.allowedToTakeGift = false;
  }

  takeGift(): void {
    this._loadingStarted();
    this.firestoreService.takeGift(this.gameData.name, this.gift.uid)
      .subscribe(() => {
        this._loadingFinished();
      }, console.error);
  }

  looseGift(): void {
    this._loadingStarted();
    this.firestoreService.looseGift(this.gameData.name, this.gift.uid)
      .subscribe(() => {
        this._loadingFinished();
      }, console.error);
  }
}
