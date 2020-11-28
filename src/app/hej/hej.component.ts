import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../services/firebase/firestore.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hej',
  templateUrl: './hej.component.html',
  styleUrls: ['./hej.component.scss']
})
export class HejComponent implements OnInit {
  gameNameValue = '';
  gameInvalid = false;

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToGameName(): void {
    const gameNameTrimmed = this.gameNameValue.trim();
    console.log(gameNameTrimmed);
    this.firestoreService.getGame(gameNameTrimmed).subscribe(() => {
      this.router.navigate([`game/${gameNameTrimmed}`]);
    }, err => {
      console.error(err);
    });
  }
}
