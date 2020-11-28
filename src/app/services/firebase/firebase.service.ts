import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firebaseConfig = {
    apiKey: 'AIzaSyAGZy_rF_NO20t1rqobhwiYusYXxZ_1NKg',
    authDomain: 'christmas-fun-4b536.firebaseapp.com',
    databaseURL: 'https://christmas-fun-4b536.firebaseio.com',
    projectId: 'christmas-fun-4b536',
    storageBucket: 'christmas-fun-4b536.appspot.com',
    messagingSenderId: '273706705245',
    appId: '1:273706705245:web:33da627bc53c0bde3ac8b4'
  };
  private readonly firebaseApp: firebase.app.App;

  constructor() {
    this.firebaseApp = firebase.initializeApp(this.firebaseConfig);
  }

  getFirebaseApp(): firebase.app.App {
    return this.firebaseApp;
  }
}
