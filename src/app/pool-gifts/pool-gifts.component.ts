import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FirestoreGame, FirestoreGameGift} from '../services/firebase/models/game';

@Component({
  selector: 'app-gifts',
  templateUrl: './pool-gifts.component.html',
  styleUrls: ['./pool-gifts.component.scss']
})
export class PoolGiftsComponent implements OnChanges {
  @Input() gameData!: FirestoreGame;
  @Input() takeGiftDiceNumbers: number[] = [];

  poolGifts: FirestoreGameGift[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // Only the gifts that doesn't belong to a player should be shown here
    this.poolGifts = this.gameData.gifts.filter(g => g.belongsTo === null);
  }
}
