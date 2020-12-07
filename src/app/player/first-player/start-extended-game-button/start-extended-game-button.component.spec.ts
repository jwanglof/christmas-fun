import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartExtendedGameButtonComponent } from './start-extended-game-button.component';

describe('StartExtendedGameButtonComponent', () => {
  let component: StartExtendedGameButtonComponent;
  let fixture: ComponentFixture<StartExtendedGameButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartExtendedGameButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartExtendedGameButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
