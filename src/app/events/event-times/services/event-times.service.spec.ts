import { TestBed } from '@angular/core/testing';

import { EventTimesService } from './event-times.service';

describe('EventTimesService', () => {
  let service: EventTimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
