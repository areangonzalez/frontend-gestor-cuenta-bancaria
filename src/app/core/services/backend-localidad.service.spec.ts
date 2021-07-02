import { TestBed } from '@angular/core/testing';

import { BackendLocalidadService } from './backend-localidad.service';

describe('BackendLocalidadService', () => {
  let service: BackendLocalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendLocalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
