import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialExportacionComponent } from './historial-exportacion.component';

describe('HistorialExportacionComponent', () => {
  let component: HistorialExportacionComponent;
  let fixture: ComponentFixture<HistorialExportacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialExportacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialExportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
