import { TestBed } from '@angular/core/testing';

import { CuentaSaldoService } from './cuenta-saldo.service';

describe('CuentaSaldoService', () => {
  let service: CuentaSaldoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentaSaldoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
