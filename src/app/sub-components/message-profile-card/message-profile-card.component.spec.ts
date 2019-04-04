import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageProfileCardComponent } from './message-profile-card.component';

describe('MessageProfileCardComponent', () => {
  let component: MessageProfileCardComponent;
  let fixture: ComponentFixture<MessageProfileCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageProfileCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
