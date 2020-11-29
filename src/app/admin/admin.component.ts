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
  allGames: FirestoreGame[] = [];

  constructor(
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.getAllGames();
  }

  createNewGame(): void {
    this.firestoreService.createNewGame(this.gameNameValue)
      .subscribe((gameData: FirestoreGame) => {
        console.log('Game data:', gameData);
      }, err => {
        console.error(err);
      });
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
