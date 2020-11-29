import {Component, Input, OnInit} from '@angular/core';
import {FirestoreGame, FirestoreGameGift} from '../../../services/firebase/models/game';
import {StorageService} from '../../../services/firebase/storage.service';
import {SessionStorageService} from '../../../services/session-storage.service';
import {FirestoreService} from '../../../services/firebase/firestore.service';
import {GameService} from '../../../services/game.service';
import {GiftService} from '../../../services/gift.service';

@Component({
  selector: 'app-play-field-gift',
  templateUrl: './play-field-gift.component.html',
  styleUrls: ['./play-field-gift.component.scss']
})
export class PlayFieldGiftComponent implements OnInit {
  @Input() gift!: FirestoreGameGift;
  @Input() gameData!: FirestoreGame;

  giftDownloadUrl: string | undefined;
  allowedToTakeGift = false;
  allowedToLooseGift = false;
  private diceNumber!: number;

  constructor(
    private storageService: StorageService,
    private sessionStorageService: SessionStorageService,
    private firestoreService: FirestoreService,
    private gameService: GameService,
    private giftService: GiftService,
  ) { }

  ngOnInit(): void {
    const gameName = this.gameData.name;
    this.storageService.getPictureDownloadUrl(gameName, this.gift.pictureName)
      .subscribe(downloadUrl => {
        this.giftDownloadUrl = downloadUrl;
      }, console.error);

    this.giftService.looseGiftEvent$.subscribe((diceNumber: number) => {
      this.allowedToLooseGift = this.gameService.allowedToLooseGift(this.gift, this.gameData, diceNumber);
      this.diceNumber = diceNumber;
    });

    this.giftService.takeGiftEvent$.subscribe((diceNumber: number) => {
      this.allowedToTakeGift = this.gameService.allowedToTakeGift(this.gift, this.gameData, diceNumber);
      this.diceNumber = diceNumber;
    });
  }

  takeGift(): void {
    this.firestoreService.takeGift(this.gameData.name, this.gift.uid)
      .subscribe(() => {
        // Send the update-dice-number event to Firebase
        this.firestoreService.changeDiceNumber(this.gameData.name, this.diceNumber)
          .subscribe(() => {
            console.log('NENNENE::', this.diceNumber);
          }, console.error);
      }, console.error);
  }

  looseGift(): void {
    this.firestoreService.looseGift(this.gameData.name, this.gift.uid)
      .subscribe(() => {
        // Send the update-dice-number event to Firebase
        this.firestoreService.changeDiceNumber(this.gameData.name, this.diceNumber)
          .subscribe(() => {
            console.log('NENNENE::', this.diceNumber);
          }, console.error);
      }, console.error);
  }
}
