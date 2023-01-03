import { TestBed } from '@angular/core/testing';

import { FacepalmsService } from './facepalms.service';

describe('FacepalmsService', () => {
  let service: FacepalmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacepalmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
