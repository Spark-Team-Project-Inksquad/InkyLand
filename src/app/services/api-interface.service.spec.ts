import { TestBed } from '@angular/core/testing';

import { ApiInterfaceService } from './api-interface.service';

describe('ApiInterfaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiInterfaceService = TestBed.get(ApiInterfaceService);
    expect(service).toBeTruthy();
  });
});
