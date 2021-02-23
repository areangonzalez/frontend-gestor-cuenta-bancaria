import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPermisoListaComponent } from './usuario-permiso-lista.component';

describe('UsuarioPermisoListaComponent', () => {
  let component: UsuarioPermisoListaComponent;
  let fixture: ComponentFixture<UsuarioPermisoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioPermisoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPermisoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
