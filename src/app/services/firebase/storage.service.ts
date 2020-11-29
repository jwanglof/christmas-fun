import {Injectable} from '@angular/core';
import {FirebaseService} from './firebase.service';
import firebase from 'firebase';
import {Observable} from 'rxjs';
import { nanoid } from 'nanoid';

interface PictureDownloadUrlCache {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: firebase.storage.Reference;
  private pictureDownloadUrlCache: PictureDownloadUrlCache = {};

  constructor(
    private firebaseService: FirebaseService,
  ) {
    this.storage = this.firebaseService.getFirebaseApp().storage().ref().child('pictures');
  }

  getPictureRef(pictureName: string): Observable<firebase.storage.Reference> {
    return new Observable<firebase.storage.Reference>(observer => {
      observer.next(this.storage.child(pictureName));
    });
  }

  getPictureDownloadUrl(gameName: string, pictureName: string): Observable<string> {
    if (this.pictureDownloadUrlCache[pictureName]) {
      return new Observable<string>(observer => observer.next(this.pictureDownloadUrlCache[pictureName]));
    }

    return new Observable<string>((observer: any) => {
      this.storage.child(`${gameName}/${pictureName}`)
        .getDownloadURL()
        .then(res => {
          this.pictureDownloadUrlCache[pictureName] = res;
          observer.next(res);
        })
        .catch(observer.error);
    });
  }

  uploadPicture(gameName: string, giftName: string, file: File): Observable<string> {
    return new Observable<string>((observer: any) => {
      const fileExtension = file.type.split('/')[1];
      const fileName = `${giftName.toLowerCase()}_${nanoid(6)}.${fileExtension}`;
      this.storage.child(`${gameName}/${fileName}`).put(file)
        .then(() => observer.next(fileName))
        .catch(err => observer.error(err));
    });
  }
}
