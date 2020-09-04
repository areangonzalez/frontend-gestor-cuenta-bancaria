import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCuentaPersonaComponent } from './alta-cuenta-persona.component';

describe('AltaCuentaPersonaComponent', () => {
  let component: AltaCuentaPersonaComponent;
  let fixture: ComponentFixture<AltaCuentaPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaCuentaPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaCuentaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
