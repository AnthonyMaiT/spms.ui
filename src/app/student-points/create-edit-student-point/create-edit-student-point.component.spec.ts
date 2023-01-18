import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditStudentPointComponent } from './create-edit-student-point.component';

describe('CreateEditStudentPointComponent', () => {
  let component: CreateEditStudentPointComponent;
  let fixture: ComponentFixture<CreateEditStudentPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditStudentPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditStudentPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
