import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPollComponent } from './modal-poll.component';

describe('ModalPollComponent', () => {
  let component: ModalPollComponent;
  let fixture: ComponentFixture<ModalPollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPollComponent]
    });
    fixture = TestBed.createComponent(ModalPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
