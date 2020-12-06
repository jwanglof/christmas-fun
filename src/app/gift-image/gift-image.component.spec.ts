import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftImageComponent } from './gift-image.component';

describe('GiftImageComponent', () => {
  let component: GiftImageComponent;
  let fixture: ComponentFixture<GiftImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
