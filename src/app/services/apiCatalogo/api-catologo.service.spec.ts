import { TestBed } from '@angular/core/testing';

import { ApiCatologoService } from './api-catologo.service';

describe('ApiCatologoService', () => {
  let service: ApiCatologoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCatologoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
