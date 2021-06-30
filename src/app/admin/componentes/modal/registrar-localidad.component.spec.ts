import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarLocalidadComponent } from './registrar-localidad.component';

describe('RegistrarLocalidadComponent', () => {
  let component: RegistrarLocalidadComponent;
  let fixture: ComponentFixture<RegistrarLocalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarLocalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarLocalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
