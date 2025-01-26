import { TestBed } from '@angular/core/testing';

import { DriverDataService } from './driver-data.service';

describe('DriverDataService', () => {
  let service: DriverDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
