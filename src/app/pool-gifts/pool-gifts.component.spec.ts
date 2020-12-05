import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolGiftsComponent } from './pool-gifts.component';

describe('GiftsComponent', () => {
  let component: PoolGiftsComponent;
  let fixture: ComponentFixture<PoolGiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolGiftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
