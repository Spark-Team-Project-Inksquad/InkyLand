import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceFilterComponent } from './distance-filter.component';

describe('DistanceFilterComponent', () => {
  let component: DistanceFilterComponent;
  let fixture: ComponentFixture<DistanceFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistanceFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
