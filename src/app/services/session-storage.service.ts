import { Injectable } from '@angular/core';

export enum SessionStorageKeys {
  KEY_PLAYER_UID = 'cf-player-uid',
  KEY_GAME_UID = 'cf-game-uid',
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

  deleteValue(key: SessionStorageKeys): void {
    sessionStorage.removeItem(key);
  }
}
