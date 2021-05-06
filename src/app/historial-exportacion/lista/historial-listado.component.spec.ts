import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialListadoComponent } from './historial-listado.component';

describe('HistorialListadoComponent', () => {
  let component: HistorialListadoComponent;
  let fixture: ComponentFixture<HistorialListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
