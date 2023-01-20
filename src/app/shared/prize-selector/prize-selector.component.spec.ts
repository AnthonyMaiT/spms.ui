import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeSelectorComponent } from './prize-selector.component';

describe('PrizeSelectorComponent', () => {
  let component: PrizeSelectorComponent;
  let fixture: ComponentFixture<PrizeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizeSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrizeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
