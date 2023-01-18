import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTimeSelectorComponent } from './event-time-selector.component';

describe('EventTimeSelectorComponent', () => {
  let component: EventTimeSelectorComponent;
  let fixture: ComponentFixture<EventTimeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTimeSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventTimeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
