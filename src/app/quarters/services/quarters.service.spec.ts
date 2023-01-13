import { TestBed } from '@angular/core/testing';

import { QuartersService } from './quarters.service';

describe('QuartersService', () => {
  let service: QuartersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuartersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
