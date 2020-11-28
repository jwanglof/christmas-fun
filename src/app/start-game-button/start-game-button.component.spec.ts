import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGameButtonComponent } from './start-game-button.component';

describe('StartGameButtonComponent', () => {
  let component: StartGameButtonComponent;
  let fixture: ComponentFixture<StartGameButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartGameButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGameButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
