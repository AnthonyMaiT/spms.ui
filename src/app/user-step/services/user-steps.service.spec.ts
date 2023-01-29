import { TestBed } from '@angular/core/testing';

import { UserStepsService } from './user-steps.service';

describe('UserStepsService', () => {
  let service: UserStepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
