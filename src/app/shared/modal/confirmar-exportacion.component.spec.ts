import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarExportacionComponent } from './confirmar-exportacion.component';

describe('ConfirmarExportacionComponent', () => {
  let component: ConfirmarExportacionComponent;
  let fixture: ComponentFixture<ConfirmarExportacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarExportacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarExportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
