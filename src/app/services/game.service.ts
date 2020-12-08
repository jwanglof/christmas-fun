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
    const currentPlayerUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
    const thisIsCurrentPlayerGift = currentPlayerUid === gift.belongsTo;
    const commonChecks = this._getCommonChecks(DiceService.DICE_NUMBER_TAKE_GIFT, gameData);
    return !thisIsCurrentPlayerGift && commonChecks;
  }

  allowedToLooseGift(gift: FirestoreGameGift, gameData: FirestoreGame): boolean {
    // Can never loose a gift if the extended game has started
    if (gameData.extendedGameStarted) {
      return false;
    }
    const currentPlayerUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
    const thisIsCurrentPlayerGift = currentPlayerUid === gift.belongsTo;
    const commonChecks = this._getCommonChecks(DiceService.DICE_NUMBER_LOOSE_GIFT, gameData);
    return thisIsCurrentPlayerGift && commonChecks;
  }

  private _getCommonChecks(diceNumberToCheck: number, gameData: FirestoreGame): boolean {
    const currentPlayerUid = this.sessionStorageService.getValue(SessionStorageKeys.KEY_PLAYER_UID);
    const {previousPlayerUid, currentDiceNumber} = gameData.dice;
    const previousPlayerWasMe = currentPlayerUid === previousPlayerUid;
    const diceNumberIsAllowed = currentDiceNumber === diceNumberToCheck;

    if (gameData.extendedGameStarted && gameData.ended) {
      return previousPlayerWasMe && diceNumberIsAllowed;
    }

    const gameHasEnded = gameData.ended;
    return !gameHasEnded && previousPlayerWasMe && diceNumberIsAllowed;
  }
}
