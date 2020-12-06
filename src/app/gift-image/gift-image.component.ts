import {Component, Input, OnInit} from '@angular/core';
import {FirestoreGameGift} from '../services/firebase/models/game';
import {StorageService} from '../services/firebase/storage.service';

@Component({
  selector: 'app-gift-image',
  templateUrl: './gift-image.component.html',
  styleUrls: ['./gift-image.component.scss']
})
export class GiftImageComponent implements OnInit {
  @Input() gameName!: string;
  @Input() gift!: FirestoreGameGift;
  @Input() smaller = false;

  giftDownloadUrl: string | undefined;

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.storageService.getPictureDownloadUrl(this.gameName, this.gift.pictureName)
      .subscribe(downloadUrl => {
        this.giftDownloadUrl = downloadUrl;
      }, console.error);
  }

}
