import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWinnersComponent } from './update-winners.component';

describe('UpdateWinnersComponent', () => {
  let component: UpdateWinnersComponent;
  let fixture: ComponentFixture<UpdateWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWinnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
