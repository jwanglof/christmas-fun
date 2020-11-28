import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../services/firebase/firestore.service';
import {FirestoreGame} from '../services/firebase/models/game';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  gameNameValue = '';
  allGames: FirestoreGame[] = [];
  firestore: FirestoreService;

  constructor(
    firestoreService: FirestoreService
  ) {
    this.firestore = firestoreService;
  }

  ngOnInit(): void {
    this.getAllGames();
  }

  createNewGame(): void {
    this.firestore.createNewGame(this.gameNameValue)
      .subscribe((gameData: FirestoreGame) => {
        console.log('Game data:', gameData);
      }, err => {
        console.error(err);
      });
  }

  getAllGames(): void {
    this.firestore.getAllGames()
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
