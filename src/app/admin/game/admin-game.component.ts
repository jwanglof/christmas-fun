import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirestoreService} from '../../services/firebase/firestore.service';

@Component({
  selector: 'app-game',
  templateUrl: './admin-game.component.html',
  styleUrls: ['./admin-game.component.scss']
})
export class AdminGameComponent implements OnInit {
  private gameName = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: FirestoreService
  ) { }

  ngOnInit(): void {
    this.gameName = this.activatedRoute.snapshot.paramMap.get('gameName') || '';
    if (this.gameName === '') {
      return;
    }

    this.firestore.getGame(this.gameName).subscribe(gameData => {
      console.log('gameData::', gameData);
    }, err => {
      console.error(err);
    });
  }

}
