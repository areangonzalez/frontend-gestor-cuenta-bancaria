import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacionCbuComponent } from './importacion-cbu.component';

describe('ImportacionCbuComponent', () => {
  let component: ImportacionCbuComponent;
  let fixture: ComponentFixture<ImportacionCbuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportacionCbuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportacionCbuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
