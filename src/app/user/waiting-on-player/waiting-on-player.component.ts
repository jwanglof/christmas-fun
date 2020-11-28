import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-waiting-on-player',
  templateUrl: './waiting-on-player.component.html',
  styleUrls: ['./waiting-on-player.component.scss']
})
export class WaitingOnPlayerComponent implements OnInit, OnDestroy {
  dotText = '.';
  intervalRef: number | null = null;

  constructor() { }

  ngOnInit(): void {
    this.intervalRef = setInterval(() => {
      if (this.dotText.length === 3) {
        this.dotText = '.';
        return;
      }
      this.dotText += '.';
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalRef !== null) {
      clearInterval(this.intervalRef);
    }
  }

}
