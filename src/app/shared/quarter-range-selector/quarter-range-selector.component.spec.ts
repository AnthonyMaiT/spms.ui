import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterRangeSelectorComponent } from './quarter-range-selector.component';

describe('QuarterRangeSelectorComponent', () => {
  let component: QuarterRangeSelectorComponent;
  let fixture: ComponentFixture<QuarterRangeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuarterRangeSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuarterRangeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
