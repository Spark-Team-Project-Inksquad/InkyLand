import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOfferSpecPageComponent } from './create-offer-spec-page.component';

describe('CreateOfferSpecPageComponent', () => {
  let component: CreateOfferSpecPageComponent;
  let fixture: ComponentFixture<CreateOfferSpecPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOfferSpecPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOfferSpecPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
