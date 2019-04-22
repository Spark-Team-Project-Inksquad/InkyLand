import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintTypeFilterComponent } from './print-type-filter.component';

describe('PrintTypeFilterComponent', () => {
  let component: PrintTypeFilterComponent;
  let fixture: ComponentFixture<PrintTypeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintTypeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintTypeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
