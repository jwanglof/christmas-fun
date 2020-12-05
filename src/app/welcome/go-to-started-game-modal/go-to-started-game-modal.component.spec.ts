import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToStartedGameModalComponent } from './go-to-started-game-modal.component';

describe('GoToStartedGameModalComponent', () => {
  let component: GoToStartedGameModalComponent;
  let fixture: ComponentFixture<GoToStartedGameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoToStartedGameModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoToStartedGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
