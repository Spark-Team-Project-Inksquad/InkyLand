import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSpecCardComponent } from './vendor-spec-card.component';

describe('VendorSpecCardComponent', () => {
  let component: VendorSpecCardComponent;
  let fixture: ComponentFixture<VendorSpecCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorSpecCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSpecCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
