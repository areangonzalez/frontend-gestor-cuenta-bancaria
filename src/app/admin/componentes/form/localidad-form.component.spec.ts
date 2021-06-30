import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadFormComponent } from './localidad-form.component';

describe('LocalidadFormComponent', () => {
  let component: LocalidadFormComponent;
  let fixture: ComponentFixture<LocalidadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalidadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalidadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
