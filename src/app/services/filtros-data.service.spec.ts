import { TestBed } from '@angular/core/testing';

import { FiltrosDataService } from './filtros-data.service';

describe('FiltrosDataService', () => {
  let service: FiltrosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltrosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
