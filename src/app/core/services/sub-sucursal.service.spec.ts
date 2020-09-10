import { TestBed } from '@angular/core/testing';

import { SubSucursalService } from './sub-sucursal.service';

describe('SubSucursalService', () => {
  let service: SubSucursalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubSucursalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
