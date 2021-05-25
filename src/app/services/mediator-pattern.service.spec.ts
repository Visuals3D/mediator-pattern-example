import { TestBed } from '@angular/core/testing';

import { MediatorPatternService } from './mediator-pattern.service';

describe('MediatorPatternService', () => {
  let service: MediatorPatternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediatorPatternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
