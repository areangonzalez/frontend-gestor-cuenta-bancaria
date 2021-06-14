import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCuentaPersonaComponent } from './info-cuenta-persona.component';

describe('InfoCuentaPersonaComponent', () => {
  let component: InfoCuentaPersonaComponent;
  let fixture: ComponentFixture<InfoCuentaPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCuentaPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCuentaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
