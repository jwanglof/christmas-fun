import {Injectable} from '@angular/core';
import {FirestoreService} from './firebase/firestore.service';

export interface Timer {
  hasEnded: boolean;
  hasStarted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private intervalRef: any | null = null;

  constructor(
    private firestoreService: FirestoreService,
  ) { }

  startBackgroundTimer(gameName: string, seconds: number): void {
    // Set the date we're counting down to
    const now = new Date();
    const nowPlusTenMinutes = now.setSeconds(now.getSeconds() + seconds);
    // const nowPlusTenMinutes = now.setMinutes(now.getMinutes() + 10);
    console.log('Setting end time to:', nowPlusTenMinutes);

    // Update the count down every 1 second
    this.intervalRef = setInterval(() => {
      // Find the distance between now and the count down date
      const distance = nowPlusTenMinutes - Date.now();

      console.log('DIST::', distance);

      // If the count down is finished, write some text
      if (distance < 0) {
        console.log('END!');
        this.stopBackgroundTimer(gameName);
      }
    }, 1000);
  }

  stopBackgroundTimer(gameName: string): void {
    console.log('SET THE GAME TO ENDED!!', gameName);
    if (this.intervalRef !== null) {
      clearInterval(this.intervalRef);
    }
    this.firestoreService.endGame(gameName).subscribe(() => {
      console.log('ENDGAME');
    }, () => {
      console.error('ERROR');
    });
  }
}
