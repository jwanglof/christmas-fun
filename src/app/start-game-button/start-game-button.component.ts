import {Component, Input} from '@angular/core';
import {TimerService} from '../services/timer.service';
import {FirestoreService} from '../services/firebase/firestore.service';
import {ActivatedRoute} from '@angular/router';
import {FirestoreGame} from '../services/firebase/models/game';

@Component({
  selector: 'app-start-game-button',
  templateUrl: './start-game-button.component.html',
  styleUrls: ['./start-game-button.component.scss']
})
export class StartGameButtonComponent {
  @Input() gameData!: FirestoreGame;
  gameIsStarted = false;
  gameHasEnded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private timerService: TimerService,
    private firestoreService: FirestoreService,
  ) { }

  startGame(): void {
    const {name, lengthInSeconds} = this.gameData;
    this.firestoreService.startGame(name).subscribe(() => {
      this.timerService.startBackgroundTimer(name, lengthInSeconds);
    });
  }

}
