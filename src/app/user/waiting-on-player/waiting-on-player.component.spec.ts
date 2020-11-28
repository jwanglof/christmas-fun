import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingOnPlayerComponent } from './waiting-on-player.component';

describe('WaitingOnPlayerComponent', () => {
  let component: WaitingOnPlayerComponent;
  let fixture: ComponentFixture<WaitingOnPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingOnPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingOnPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
