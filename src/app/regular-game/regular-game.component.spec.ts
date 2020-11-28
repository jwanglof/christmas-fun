import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularGameComponent } from './regular-game.component';

describe('RegularGameComponent', () => {
  let component: RegularGameComponent;
  let fixture: ComponentFixture<RegularGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
