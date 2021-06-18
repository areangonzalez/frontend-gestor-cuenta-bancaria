import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarPrestacionComponent } from './borrar-prestacion.component';

describe('BorrarPrestacionComponent', () => {
  let component: BorrarPrestacionComponent;
  let fixture: ComponentFixture<BorrarPrestacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarPrestacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarPrestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
