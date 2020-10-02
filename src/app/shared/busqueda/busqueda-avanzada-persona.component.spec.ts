import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaAvanzadaPersonaComponent } from './busqueda-avanzada-persona.component';

describe('BusquedaAvanzadaPersonaComponent', () => {
  let component: BusquedaAvanzadaPersonaComponent;
  let fixture: ComponentFixture<BusquedaAvanzadaPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaAvanzadaPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaAvanzadaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
