import {EventEmitter, Injectable} from '@angular/core';

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
    return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  }

  sendDiceNumberChangedEvent(): void {
    this.diceNumberChangedEvent$.emit();
  }
}
