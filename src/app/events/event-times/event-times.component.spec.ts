import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTimesComponent } from './event-times.component';

describe('EventTimesComponent', () => {
  let component: EventTimesComponent;
  let fixture: ComponentFixture<EventTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
