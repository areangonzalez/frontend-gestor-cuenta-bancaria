import { TestBed } from '@angular/core/testing';

import { LocalidadExtraService } from './localidad-extra.service';

describe('LocalidadExtraService', () => {
  let service: LocalidadExtraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalidadExtraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
