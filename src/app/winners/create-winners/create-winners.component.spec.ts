import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWinnersComponent } from './create-winners.component';

describe('CreateWinnersComponent', () => {
  let component: CreateWinnersComponent;
  let fixture: ComponentFixture<CreateWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWinnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
