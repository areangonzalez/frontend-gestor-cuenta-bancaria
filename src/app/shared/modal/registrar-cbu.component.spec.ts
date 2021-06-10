import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCbuComponent } from './registrar-cbu.component';

describe('RegistrarCbuComponent', () => {
  let component: RegistrarCbuComponent;
  let fixture: ComponentFixture<RegistrarCbuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarCbuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCbuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
