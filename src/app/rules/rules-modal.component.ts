import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rules-modal',
  templateUrl: './rules-modal.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesModalComponent {
  constructor(
    public activeModal: NgbActiveModal
  ) { }
}
