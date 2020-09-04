import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLugarComponent } from './form-lugar.component';

describe('FormLugarComponent', () => {
  let component: FormLugarComponent;
  let fixture: ComponentFixture<FormLugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLugarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
