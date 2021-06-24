import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarPrestacionPendienteComponent } from './borrar-prestacion-pendiente.component';

describe('BorrarPrestacionPendienteComponent', () => {
  let component: BorrarPrestacionPendienteComponent;
  let fixture: ComponentFixture<BorrarPrestacionPendienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarPrestacionPendienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarPrestacionPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
