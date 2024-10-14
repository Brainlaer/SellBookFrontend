import { TestBed } from '@angular/core/testing';

import { toastMessageServiceService } from './toast-message.service';

describe('toastMessageServiceService', () => {
  let service: toastMessageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(toastMessageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
