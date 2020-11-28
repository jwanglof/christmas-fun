import {Component, Input} from '@angular/core';
import {FirestoreGame} from '../services/firebase/models/game';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss']
})
export class GiftsComponent {
  @Input() gameData!: FirestoreGame;

  constructor() {}
}
