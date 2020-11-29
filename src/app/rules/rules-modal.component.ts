import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rules-modal',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesModalComponent implements OnInit {
  isModal = true;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
