import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorLocalidadComponent } from './gestor-localidad.component';

describe('GestorLocalidadComponent', () => {
  let component: GestorLocalidadComponent;
  let fixture: ComponentFixture<GestorLocalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorLocalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorLocalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
