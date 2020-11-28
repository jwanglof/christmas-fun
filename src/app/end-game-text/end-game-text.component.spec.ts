import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameTextComponent } from './end-game-text.component';

describe('EndGameTextComponent', () => {
  let component: EndGameTextComponent;
  let fixture: ComponentFixture<EndGameTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndGameTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndGameTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
