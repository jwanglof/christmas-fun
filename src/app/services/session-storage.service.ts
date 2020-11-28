import { Injectable } from '@angular/core';

export enum SessionStorageKeys {
  KEY_PLAYER_UID = 'cf-player-uid',
  KEY_GAME_UID = 'cf-game-uid',  // TODO Check if this has a value, show a modal and ask if the user wants to
                                 //  enter the game IF it's not ended!
}

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  getValue(key: SessionStorageKeys): string | null {
    return sessionStorage.getItem(key);
  }

  keyValueIsEqualValue(key: SessionStorageKeys, value: string): boolean {
    return this.getValue(key) !== null && this.getValue(key) === value;
  }

  setValue(key: SessionStorageKeys, value: string): void {
    sessionStorage.setItem(key, value);
  }
}
