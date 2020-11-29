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
  currentDiceRolledPlayerUid: string | null;
}

export interface FirestoreGamePlayer {
  uid: string;
  name: string;
}

export interface FirestoreGameGift {
  uid: string;
  ownerPlayerUid: string;  // The user that brought the gift to the game
  belongsTo: string | null;  // If null, then gift belongs to no-one
  title: string;
  pictureName: string;
}
