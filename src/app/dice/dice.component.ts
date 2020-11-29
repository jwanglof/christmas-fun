import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {faDiceFive, faDiceFour, faDiceOne, faDiceSix, faDiceThree, faDiceTwo} from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {FirestoreService} from '../services/firebase/firestore.service';
import {FirestoreGame} from '../services/firebase/models/game';
import {SessionStorageKeys, SessionStorageService} from '../services/session-storage.service';
import {DiceService} from '../services/dice.service';
import {GiftService} from '../services/gift.service';


@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements OnInit, OnChanges {
  @Input() gameData!: FirestoreGame;

  diceValues: { [key: number]: IconDefinition; } = {
    1: faDiceOne,
    2: faDiceTwo,
    3: faDiceThree,
    4: faDiceFour,
    5: faDiceFive,
    6: faDiceSix
  };

  currentDiceNumber = 1;
  itsMyTurn = false;
  allowedToTakeGift = false;
  allowedToLooseGift = false;

  currentTurnPlayerName: string | null = null;

  constructor(
    private firestoreService: FirestoreService,
    private sessionStorageService: SessionStorageService,
    private diceService: DiceService,
    private giftService: GiftService,
  ) {
    this.diceService.diceNumberChangedEvent$.subscribe(() => {
      this.allowedToLooseGift = false;
      this.allowedToTakeGift = false;
    });
  }

  ngOnInit(): void {
    this._checkIfItsMyTurn();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._checkIfItsMyTurn();
  }

  private _checkIfItsMyTurn(): void {
    const {currentDiceRolledPlayerUid, currentDiceNumber} = this.gameData.dice;

    if (currentDiceRolledPlayerUid) {
      this.itsMyTurn = this.sessionStorageService.keyValueIsEqualValue(
        SessionStorageKeys.KEY_PLAYER_UID,
        currentDiceRolledPlayerUid);

      if (!this.itsMyTurn) {
        const currentTurnPlayer = this.gameData.players.find(player => player.uid === currentDiceRolledPlayerUid);
        if (currentTurnPlayer) {
          this.currentTurnPlayerName = currentTurnPlayer.name;
        }
      } else {
        this.currentTurnPlayerName = null;
      }
    }

    this.currentDiceNumber = currentDiceNumber;
  }

  private _sendChangeDiceNumber(diceNumber: number): void {
    this.firestoreService.changeDiceNumber(this.gameData.name, diceNumber)
      .subscribe(() => {
        console.log('NENNENE::', diceNumber);
      }, console.error);
  }

  diceClick(): void {
    if (this.itsMyTurn) {
      this.itsMyTurn = false;
      const newDiceNumber = this.diceService.getNewDiceNumber();

      this.currentDiceNumber = newDiceNumber;
      const myUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);

      if (newDiceNumber === DiceService.DICE_NUMBER_TAKE_GIFT) {
        // Only send this event IF THERE ARE GIFT IN THE "POOL" or IF ANY OTHER PLAYERS HAVE GIFTS!
        const giftsInPool = this.gameData.gifts.some(g => g.belongsTo === null);
        const giftsExistOnOtherPlayers = this.gameData.gifts.some(g => g.belongsTo !== myUid && g.belongsTo !== null);
        if (giftsInPool || giftsExistOnOtherPlayers) {
          this.allowedToTakeGift = true;
          this.giftService.sendTakeGiftEvent(newDiceNumber);
          return;
        }
      } else if (newDiceNumber === DiceService.DICE_NUMBER_LOOSE_GIFT) {
        // Only send this event IF THE CURRENT USER HAVE ANY GIFTS
        const myGifts = this.gameData.gifts.filter(gift => gift.belongsTo === myUid);
        if (myGifts.length) {
          this.allowedToLooseGift = true;
          this.giftService.sendLooseGiftEvent(newDiceNumber);
          return;
        }
      }

      this._sendChangeDiceNumber(newDiceNumber);
    }
  }
}
