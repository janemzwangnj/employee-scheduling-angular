import { TestBed } from '@angular/core/testing';

import { ClocinoutService } from './clockinout.service';

describe('ClocinoutService', () => {
  let service: ClocinoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClocinoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
