import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePrizesComponent } from './create-update-prizes.component';

describe('CreateUpdatePrizesComponent', () => {
  let component: CreateUpdatePrizesComponent;
  let fixture: ComponentFixture<CreateUpdatePrizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePrizesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdatePrizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
