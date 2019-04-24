import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSpecViewComponent } from './vendor-spec-view.component';

describe('VendorSpecViewComponent', () => {
  let component: VendorSpecViewComponent;
  let fixture: ComponentFixture<VendorSpecViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorSpecViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSpecViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
