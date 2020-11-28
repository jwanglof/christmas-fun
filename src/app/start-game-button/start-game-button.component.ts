import {Component, Input} from '@angular/core';
import {TimerService} from '../services/timer.service';
import {FirestoreService} from '../services/firebase/firestore.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-start-game-button',
  templateUrl: './start-game-button.component.html',
  styleUrls: ['./start-game-button.component.scss']
})
export class StartGameButtonComponent {
  @Input() gameName!: string;
  gameIsStarted = false;
  gameHasEnded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private timerService: TimerService,
    private firestoreService: FirestoreService,
  ) { }

  startGame(): void {
    this.firestoreService.startGame(this.gameName).subscribe(() => {
      this.timerService.startBackgroundTimer(this.gameName);
    });
  }

}
