import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFilterComponent } from './shipping-filter.component';

describe('ShippingFilterComponent', () => {
  let component: ShippingFilterComponent;
  let fixture: ComponentFixture<ShippingFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
