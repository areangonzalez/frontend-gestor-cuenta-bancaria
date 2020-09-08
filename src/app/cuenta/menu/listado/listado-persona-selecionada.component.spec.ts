import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPersonaSelecionadaComponent } from './listado-persona-selecionada.component';

describe('ListadoPersonaSelecionadaComponent', () => {
  let component: ListadoPersonaSelecionadaComponent;
  let fixture: ComponentFixture<ListadoPersonaSelecionadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoPersonaSelecionadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPersonaSelecionadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
