import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import {FirestoreGame, FirestoreGameDiceValues, FirestoreGameGift} from './firebase/models/game';

describe('GameService', () => {
  let service: GameService;

  const playerUid = 'foo';
  const prevPlayerUid = 'bar';

  function spyOnSessionStorage(returnValue: string): void {
    spyOn(window.sessionStorage, 'getItem').and.callFake(() => {
      return returnValue;
    });
  }

  function getValidGift(belongsTo: string): FirestoreGameGift {
    return {
      belongsTo,
      ownerPlayerUid: '',
      pictureName: '',
      title: '',
      uid: '',
    };
  }

  function getValidGameData(gift: FirestoreGameGift, currentDiceNumber: number): FirestoreGame {
    const dice: FirestoreGameDiceValues = {
      currentDiceNumber,
      currentDiceRolledPlayerUid: null,
      previousPlayerUid: prevPlayerUid,
      waitUntilPreviousPlayerIsDone: false
    };
    return {
      created: 0,
      deleted: false,
      dice,
      ended: false,
      gifts: [gift],
      lengthInSeconds: 0,
      name: '',
      players: [],
      started: false,
      updated: 0
    };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  describe('allowedToTakeGift tests', () => {
    it('should return true', () => {
      spyOnSessionStorage(prevPlayerUid);

      const gift = getValidGift(playerUid);
      const gameData = getValidGameData(gift, 6);
      expect(service.allowedToTakeGift(gift, gameData)).toBeTrue();
    });

    it('should return false', () => {
      spyOnSessionStorage(playerUid);

      const gift = getValidGift(playerUid);
      const gameData = getValidGameData(gift, 6);
      expect(service.allowedToTakeGift(gift, gameData)).toBeFalse();
    });
  });

  describe('allowedToLooseGift tests', () => {
    it('should return true', () => {
      spyOnSessionStorage(prevPlayerUid);

      const gift = getValidGift(prevPlayerUid);
      const gameData = getValidGameData(gift, 1);
      expect(service.allowedToLooseGift(gift, gameData)).toBeTrue();
    });

    it('should return false', () => {
      spyOnSessionStorage(playerUid);

      const gift = getValidGift(prevPlayerUid);
      const gameData = getValidGameData(gift, 1);
      expect(service.allowedToLooseGift(gift, gameData)).toBeFalse();
    });
  });
});
