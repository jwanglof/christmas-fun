import {Component, Input, OnChanges} from '@angular/core';
import {FirestoreGame} from '../../services/firebase/models/game';

@Component({
  selector: 'app-first-player',
  templateUrl: './first-player.component.html',
  styleUrls: ['./first-player.component.scss']
})
export class FirstPlayerComponent implements OnChanges {
  @Input() gameData!: FirestoreGame;

  showStartGameButton = false;
  showExtendedGameButton = false;

  constructor() { }

  ngOnChanges(): void {
    const {extendedGame, ended, started} = this.gameData;
    if (extendedGame && ended && started) {
      this.showStartGameButton = false;
      this.showExtendedGameButton = true;
      return;
    }
    this.showStartGameButton = true;
    this.showExtendedGameButton = false;
  }

}
