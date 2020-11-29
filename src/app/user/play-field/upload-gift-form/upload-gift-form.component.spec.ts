import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGiftFormComponent } from './upload-gift-form.component';

describe('UploadGiftFormComponent', () => {
  let component: UploadGiftFormComponent;
  let fixture: ComponentFixture<UploadGiftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadGiftFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGiftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
