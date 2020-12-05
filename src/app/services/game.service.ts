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

  allowedToTakeGift(gift: FirestoreGameGift, gameData: FirestoreGame): boolean {
    const {previousPlayerUid, currentDiceNumber} = gameData.dice;
    const currentPlayerUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
    const thisIsCurrentPlayerGift = currentPlayerUid === gift.belongsTo;
    const gameHasEnded = gameData.ended;
    const previousPlayerWasMe = currentPlayerUid === previousPlayerUid;
    const allowedToTakeGift = currentDiceNumber === DiceService.DICE_NUMBER_TAKE_GIFT;
    return !thisIsCurrentPlayerGift && !gameHasEnded && previousPlayerWasMe && allowedToTakeGift;
  }

  allowedToLooseGift(gift: FirestoreGameGift, gameData: FirestoreGame): boolean {
    const {previousPlayerUid, currentDiceNumber} = gameData.dice;
    const currentPlayerUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
    const thisIsCurrentPlayerGift = currentPlayerUid === gift.belongsTo;
    const gameHasEnded = gameData.ended;
    const previousPlayerWasMe = currentPlayerUid === previousPlayerUid;
    const allowedToLooseGift = currentDiceNumber === DiceService.DICE_NUMBER_LOOSE_GIFT;
    // const asd = this._checkCommons(DiceService.DICE_NUMBER_LOOSE_GIFT, gameData);
    return thisIsCurrentPlayerGift && !gameHasEnded && previousPlayerWasMe && allowedToLooseGift;
  }

  // TODO Add tests for this before changing!
  private _checkCommons(diceNumberToCheck: number, gameData: FirestoreGame): boolean {
    const currentPlayerUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
    const {previousPlayerUid, currentDiceNumber} = gameData.dice;
    const gameHasEnded = gameData.ended;
    const previousPlayerWasMe = currentPlayerUid === previousPlayerUid;
    const allowedToLooseGift = currentDiceNumber === diceNumberToCheck;
    return !gameHasEnded && previousPlayerWasMe && allowedToLooseGift;
  }
}
