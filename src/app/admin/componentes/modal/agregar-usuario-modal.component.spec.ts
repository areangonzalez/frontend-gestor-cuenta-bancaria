import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUsuarioModalComponent } from './agregar-usuario-modal.component';

describe('AgregarUsuarioModalComponent', () => {
  let component: AgregarUsuarioModalComponent;
  let fixture: ComponentFixture<AgregarUsuarioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarUsuarioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
