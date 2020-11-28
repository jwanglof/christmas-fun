import {Component, Input, OnInit} from '@angular/core';
import {FirestoreGame, FirestoreGameGift} from '../../services/firebase/models/game';
import {StorageService} from '../../services/firebase/storage.service';
import {FirestoreService} from '../../services/firebase/firestore.service';
import {GameService} from '../../services/game.service';
import {GiftService} from '../../services/gift.service';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.scss']
})
export class GiftComponent implements OnInit {
  @Input() gift!: FirestoreGameGift;
  @Input() gameData!: FirestoreGame;

  giftDownloadUrl: string | undefined;

  allowedToTakeGift = false;
  giftIsUpForTheTaking = false;
  private diceNumber!: number;

  constructor(
    private storageService: StorageService,
    private firestoreService: FirestoreService,
    private gameService: GameService,
    private giftService: GiftService,
  ) { }

  ngOnInit(): void {
    this.giftService.takeGiftEvent$.subscribe((diceNumber: number) => {
      this.allowedToTakeGift = this.gameService.allowedToTakeGift(this.gift, this.gameData, diceNumber);
      this.diceNumber = diceNumber;
    });

    const giftIsUpForTheTaking = this.gift.belongsTo === null;
    if (giftIsUpForTheTaking) {
      this.storageService.getPictureDownloadUrl(this.gift.pictureName)
        .subscribe(downloadUrl => {
          this.giftDownloadUrl = downloadUrl;
          this.giftIsUpForTheTaking = giftIsUpForTheTaking;
        }, console.error);
    }
  }

  takeGift(): void {
    this.firestoreService.takeGift(this.gameData.name, this.gift.uid)
      .subscribe(() => {
        this.firestoreService.changeDiceNumber(this.gameData.name, this.diceNumber)
          .subscribe(() => {
            console.log('NENNENE::', this.diceNumber);
          }, console.error);
      });
  }

}
