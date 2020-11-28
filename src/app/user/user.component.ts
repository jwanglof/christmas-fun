import {Component, Input} from '@angular/core';
import {FirestoreGame, FirestoreGamePlayer} from '../services/firebase/models/game';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() playerData: FirestoreGamePlayer | null = null;
  @Input() gameData!: FirestoreGame;
  @Input() playerNumber!: number;

  constructor() {}
}
