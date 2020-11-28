import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayFieldGiftComponent } from './play-field-gift.component';

describe('PlayFieldGiftComponent', () => {
  let component: PlayFieldGiftComponent;
  let fixture: ComponentFixture<PlayFieldGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayFieldGiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayFieldGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
