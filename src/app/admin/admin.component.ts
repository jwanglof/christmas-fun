import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../services/firebase/firestore.service';
import {FirestoreGame} from '../services/firebase/models/game';
// @ts-ignore
import {word} from 'mngen';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  gameNameValue = word(3);
  gameLengthValue = 600;
  allGames: FirestoreGame[] = [];
  disabled = false;

  constructor(
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.getAllGames();
  }

  createNewGame(): void {
    if (this.gameNameValue !== '' && this.gameLengthValue > 0) {
      this.disabled = true;
      this.firestoreService.createNewGame(this.gameNameValue, this.gameLengthValue)
        .subscribe((gameData: FirestoreGame) => {
          console.log('Game data:', gameData);
          this.allGames.push(gameData);
          this.gameNameValue = word(3);
          this.disabled = false;
        }, err => {
          console.error(err);
        });
    }
  }

  getAllGames(): void {
    this.firestoreService.getAllGames()
      .subscribe(querySnapshot => {
        querySnapshot.forEach((gameDoc: any) => {
          console.log(gameDoc.id, gameDoc.data());
          this.allGames.push(gameDoc.data());
        });
      }, err => {
        console.error(err);
      });
  }
}
