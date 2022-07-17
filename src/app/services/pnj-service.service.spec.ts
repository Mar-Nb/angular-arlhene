import { TestBed } from '@angular/core/testing';

import { PnjServiceService } from './pnj-service.service';

describe('PnjServiceService', () => {
  let service: PnjServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PnjServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
