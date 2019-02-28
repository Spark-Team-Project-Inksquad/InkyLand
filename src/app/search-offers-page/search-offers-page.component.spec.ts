import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOffersPageComponent } from './search-offers-page.component';

describe('SearchOffersPageComponent', () => {
  let component: SearchOffersPageComponent;
  let fixture: ComponentFixture<SearchOffersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOffersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOffersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
