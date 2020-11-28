import {Injectable} from '@angular/core';
import {FirebaseService} from './firebase.service';
import firebase from 'firebase';
import {Observable} from 'rxjs';

interface PictureDownloadUrlCache {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: firebase.storage.Storage;
  private pictureDownloadUrlCache: PictureDownloadUrlCache = {};

  constructor(
    private firebaseService: FirebaseService,
  ) {
    this.storage = this.firebaseService.getFirebaseApp().storage();
  }

  getPictureRef(pictureName: string): Observable<firebase.storage.Reference> {
    return new Observable<firebase.storage.Reference>(observer => {
      observer.next(this.storage.ref().child('pictures').child(pictureName));
    });
  }

  getPictureDownloadUrl(pictureName: string): Observable<string> {
    if (this.pictureDownloadUrlCache[pictureName]) {
      return new Observable<string>(observer => observer.next(this.pictureDownloadUrlCache[pictureName]));
    }

    return new Observable<string>((observer: any) => {
      this.storage.ref().child('pictures').child(pictureName)
        .getDownloadURL()
        .then(res => {
          this.pictureDownloadUrlCache[pictureName] = res;
          observer.next(res);
        })
        .catch(observer.error);
    });
  }
}
