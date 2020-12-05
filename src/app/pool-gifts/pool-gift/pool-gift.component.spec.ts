import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolGiftComponent } from './pool-gift.component';

describe('GiftComponent', () => {
  let component: PoolGiftComponent;
  let fixture: ComponentFixture<PoolGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolGiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
