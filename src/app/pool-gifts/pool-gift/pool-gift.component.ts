import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FirestoreGame, FirestoreGameGift} from '../../services/firebase/models/game';
import {StorageService} from '../../services/firebase/storage.service';
import {FirestoreService} from '../../services/firebase/firestore.service';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-gift',
  templateUrl: './pool-gift.component.html',
  styleUrls: ['./pool-gift.component.scss']
})
export class PoolGiftComponent implements OnChanges {
  @Input() gift!: FirestoreGameGift;
  @Input() gameData!: FirestoreGame;
  @Input() takeGiftDiceNumbers: number[] = [];

  giftDownloadUrl: string | undefined;

  allowedToTakeGift = false;
  giftIsUpForTheTaking = false;
  private diceNumber!: number;

  constructor(
    private storageService: StorageService,
    private firestoreService: FirestoreService,
    private gameService: GameService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const giftIsUpForTheTaking = this.gift.belongsTo === null;
    const {takeGiftDiceNumbers} = changes;
    if (giftIsUpForTheTaking) {
      const gameName = this.gameData.name;
      this.storageService.getPictureDownloadUrl(gameName, this.gift.pictureName)
        .subscribe(downloadUrl => {
          this.giftDownloadUrl = downloadUrl;
          this.giftIsUpForTheTaking = giftIsUpForTheTaking;
        }, console.error);
    }


    if (takeGiftDiceNumbers.firstChange && takeGiftDiceNumbers.currentValue.length >= 0) {
      this._checkIfAllowedToTakeGift();
    } else if (takeGiftDiceNumbers.currentValue.length > takeGiftDiceNumbers.previousValue.length) {
      this._checkIfAllowedToTakeGift();
    }
  }

  private _checkIfAllowedToTakeGift(): void {
    this.allowedToTakeGift = this.gameService.allowedToTakeGift(this.gift, this.gameData);
  }

  takeGift(): void {
    this.firestoreService.takeGift(this.gameData.name, this.gift.uid)
      .subscribe(() => {
          console.log('NENNENE::', this.diceNumber);
      });
  }

}
