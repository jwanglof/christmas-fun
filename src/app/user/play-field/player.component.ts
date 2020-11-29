import {Component, Input, OnInit} from '@angular/core';
import {FirestoreGame, FirestoreGameGift, FirestoreGamePlayer} from '../../services/firebase/models/game';
import {SessionStorageKeys, SessionStorageService} from '../../services/session-storage.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() playerData!: FirestoreGamePlayer;
  @Input() gameData!: FirestoreGame;
  @Input() playerNumber!: number;

  thisIsPlayer = false;
  thisPlayerHaveAGift = false;
  thisPlayerGifts: FirestoreGameGift[] = [];

  constructor(
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.thisIsPlayer = this.sessionStorageService.keyValueIsEqualValue(SessionStorageKeys.KEY_PLAYER_UID, this.playerData.uid);
    this._setThisPlayerGifts(this.playerData.uid);

    const thisPlayerHaveAGift = this.gameData.gifts.find(gift => {
      return gift.ownerPlayerUid === this.playerData.uid;
    });
    this.thisPlayerHaveAGift = !!thisPlayerHaveAGift;
  }

  private _setThisPlayerGifts(playerUid: string): void {
    const thisPlayerGifts = this.gameData.gifts.filter(gift => gift.belongsTo && gift.belongsTo === playerUid);
    if (thisPlayerGifts.length) {
      this.thisPlayerGifts = thisPlayerGifts;
    }
  }
}
