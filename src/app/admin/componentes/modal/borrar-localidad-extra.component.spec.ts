import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarLocalidadExtraComponent } from './borrar-localidad-extra.component';

describe('BorrarLocalidadExtraComponent', () => {
  let component: BorrarLocalidadExtraComponent;
  let fixture: ComponentFixture<BorrarLocalidadExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarLocalidadExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarLocalidadExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
