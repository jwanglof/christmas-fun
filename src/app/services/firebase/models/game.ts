import {FirestoreBase} from './base';

export interface FirestoreGame extends FirestoreBase {
  name: string;
  ended: boolean;
  started: boolean;
  lengthInSeconds: number;
  dice: FirestoreGameDiceValues;
  players: FirestoreGamePlayer[];
  gifts: FirestoreGameGift[];
}

export interface FirestoreGameDiceValues {
  currentDiceNumber: number;
  currentDiceRolledPlayerUid: string | null;  // will contain the player whose turn it is
  waitUntilPreviousPlayerIsDone: boolean;  // will be true if the previous player should loose or take a gift
  previousPlayerUid: string | null;  // will be set if waitUntilPreviousPlayerIsDone is true
}

export interface FirestoreGamePlayer {
  uid: string;
  name: string;
}

export interface FirestoreGameGift {
  uid: string;
  ownerPlayerUid: string;  // the user that brought the gift to the game
  belongsTo: string | null;  // if null, then gift belongs to no-one and is shown in the gift pool
  title: string;
  pictureName: string;
}
