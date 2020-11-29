import {EventEmitter, Injectable} from '@angular/core';
// @ts-ignore
import random from 'random-number-js';

@Injectable({
  providedIn: 'root'
})
export class DiceService {
  static DICE_NUMBER_LOOSE_GIFT = 1;
  static DICE_NUMBER_TAKE_GIFT = 6;
  public diceNumberChangedEvent$: EventEmitter<void>;

  constructor() {
    this.diceNumberChangedEvent$ = new EventEmitter<void>();
  }

  getNewDiceNumber(): number {
    return random(1, 6);
  }

  sendDiceNumberChangedEvent(): void {
    this.diceNumberChangedEvent$.emit();
  }
}
