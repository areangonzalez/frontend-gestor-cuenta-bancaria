import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionTabComponent } from './configuracion-tab.component';

describe('ConfiguracionTabComponent', () => {
  let component: ConfiguracionTabComponent;
  let fixture: ComponentFixture<ConfiguracionTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
