import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerGiftComponent } from './player-gift.component';

describe('PlayFieldGiftComponent', () => {
  let component: PlayerGiftComponent;
  let fixture: ComponentFixture<PlayerGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerGiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
