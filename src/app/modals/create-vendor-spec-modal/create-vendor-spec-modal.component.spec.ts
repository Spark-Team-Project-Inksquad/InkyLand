import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVendorSpecModalComponent } from './create-vendor-spec-modal.component';

describe('CreateVendorSpecModalComponent', () => {
  let component: CreateVendorSpecModalComponent;
  let fixture: ComponentFixture<CreateVendorSpecModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVendorSpecModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVendorSpecModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
