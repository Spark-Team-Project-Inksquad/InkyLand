import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDocumentPageComponent } from './new-document-page.component';

describe('NewDocumentPageComponent', () => {
  let component: NewDocumentPageComponent;
  let fixture: ComponentFixture<NewDocumentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDocumentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDocumentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
