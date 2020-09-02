import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPersonaComponent } from './registrar-persona.component';

describe('RegistrarPersonaComponent', () => {
  let component: RegistrarPersonaComponent;
  let fixture: ComponentFixture<RegistrarPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
