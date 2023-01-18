import { TestBed } from '@angular/core/testing';

import { StudentPointsService } from './student-points.service';

describe('StudentPointsService', () => {
  let service: StudentPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
