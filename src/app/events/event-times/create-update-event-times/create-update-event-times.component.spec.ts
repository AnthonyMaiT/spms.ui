import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateEventTimesComponent } from './create-update-event-times.component';

describe('CreateUpdateEventTimesComponent', () => {
  let component: CreateUpdateEventTimesComponent;
  let fixture: ComponentFixture<CreateUpdateEventTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateEventTimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateEventTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
