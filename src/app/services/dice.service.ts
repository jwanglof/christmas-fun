import {Injectable} from '@angular/core';
// @ts-ignore
import random from 'random-number-js';

@Injectable({
  providedIn: 'root'
})
export class DiceService {
  static DICE_NUMBER_LOOSE_GIFT = 1;
  static DICE_NUMBER_TAKE_GIFT = 6;

  constructor() {}

  getNewDiceNumber(): number {
    return random(1, 6);
  }
}
