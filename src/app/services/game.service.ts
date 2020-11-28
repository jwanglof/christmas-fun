import { Injectable } from '@angular/core';
import {SessionStorageKeys, SessionStorageService} from './session-storage.service';
import {DiceService} from './dice.service';
import {FirestoreGame, FirestoreGameGift} from './firebase/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private sessionStorageService: SessionStorageService,
  ) { }

  allowedToTakeGift(gift: FirestoreGameGift, gameData: FirestoreGame, diceNumber?: number): boolean {
    const {currentDiceRolledPlayerUid, currentDiceNumber} = gameData.dice;
    const diceNumberToUse = diceNumber ? diceNumber : currentDiceNumber;
    const currentPlayerUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
    const thisIsCurrentPlayerGift = currentPlayerUid === gift.belongsTo;
    const gameHasEnded = gameData.ended;
    const currentPlayersTurn = currentPlayerUid === currentDiceRolledPlayerUid;
    // TODO Remove this DICE NUMBER check
    const allowedToTakeGift = diceNumberToUse === DiceService.DICE_NUMBER_TAKE_GIFT;
    return !thisIsCurrentPlayerGift && !gameHasEnded && currentPlayersTurn && allowedToTakeGift;
  }

  allowedToLooseGift(gift: FirestoreGameGift, gameData: FirestoreGame, diceNumber?: number): boolean {
    const {currentDiceRolledPlayerUid, currentDiceNumber} = gameData.dice;
    const diceNumberToUse = diceNumber ? diceNumber : currentDiceNumber;
    const currentPlayerUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
    const thisIsCurrentPlayerGift = currentPlayerUid === gift.belongsTo;
    const gameHasEnded = gameData.ended;
    const currentPlayersTurn = currentPlayerUid === currentDiceRolledPlayerUid;
    // TODO Remove this DICE NUMBER check
    const allowedToLooseGift = diceNumberToUse === DiceService.DICE_NUMBER_LOOSE_GIFT;
    return thisIsCurrentPlayerGift && !gameHasEnded && currentPlayersTurn && allowedToLooseGift;
  }
}
