import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaAvanzadaLocalidadComponent } from './busqueda-avanzada-localidad.component';

describe('BusquedaAvanzadaLocalidadComponent', () => {
  let component: BusquedaAvanzadaLocalidadComponent;
  let fixture: ComponentFixture<BusquedaAvanzadaLocalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaAvanzadaLocalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaAvanzadaLocalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
