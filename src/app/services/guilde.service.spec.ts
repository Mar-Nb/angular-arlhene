import { TestBed } from '@angular/core/testing';

import { GuildeService } from './guilde.service';

describe('GuildeService', () => {
  let service: GuildeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuildeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
