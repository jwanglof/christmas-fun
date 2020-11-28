import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GiftService {
  public looseGiftEvent$: EventEmitter<number>;
  public takeGiftEvent$: EventEmitter<number>;

  constructor() {
    this.looseGiftEvent$ = new EventEmitter<number>();
    this.takeGiftEvent$ = new EventEmitter<number>();
  }

  sendLooseGiftEvent(diceNumber: number): void {
    this.looseGiftEvent$.emit(diceNumber);
  }

  sendTakeGiftEvent(diceNumber: number): void {
    this.takeGiftEvent$.emit(diceNumber);
  }
}
