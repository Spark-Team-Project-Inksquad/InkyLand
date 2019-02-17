import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrintingOfferPageComponent } from './create-printing-offer-page.component';

describe('CreatePrintingOfferPageComponent', () => {
  let component: CreatePrintingOfferPageComponent;
  let fixture: ComponentFixture<CreatePrintingOfferPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePrintingOfferPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrintingOfferPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
