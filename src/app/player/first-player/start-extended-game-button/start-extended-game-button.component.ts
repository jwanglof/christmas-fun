import {Component, Input, OnInit} from '@angular/core';
import {FirestoreGame} from '../../../services/firebase/models/game';
import {FirestoreService} from '../../../services/firebase/firestore.service';

@Component({
  selector: 'app-start-extended-game-button',
  templateUrl: './start-extended-game-button.component.html',
  styleUrls: ['./start-extended-game-button.component.scss']
})
export class StartExtendedGameButtonComponent implements OnInit {
  @Input() gameData!: FirestoreGame;

  constructor(
    private firestoreService: FirestoreService,
  ) { }

  ngOnInit(): void {
  }

  startExtendedGame(): void {
    console.log('YOU ARE HERE!');
  }
}
