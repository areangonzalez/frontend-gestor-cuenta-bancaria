import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadExtraListaComponent } from './localidad-extra-lista.component';

describe('LocalidadExtraListaComponent', () => {
  let component: LocalidadExtraListaComponent;
  let fixture: ComponentFixture<LocalidadExtraListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalidadExtraListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalidadExtraListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
