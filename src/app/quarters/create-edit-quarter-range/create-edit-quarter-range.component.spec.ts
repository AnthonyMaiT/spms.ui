import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditQuarterRangeComponent } from './create-edit-quarter-range.component';

describe('CreateEditQuarterRangeComponent', () => {
  let component: CreateEditQuarterRangeComponent;
  let fixture: ComponentFixture<CreateEditQuarterRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditQuarterRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditQuarterRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
