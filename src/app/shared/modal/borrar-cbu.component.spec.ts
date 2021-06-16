import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarCbuComponent } from './borrar-cbu.component';

describe('BorrarCbuComponent', () => {
  let component: BorrarCbuComponent;
  let fixture: ComponentFixture<BorrarCbuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarCbuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarCbuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
