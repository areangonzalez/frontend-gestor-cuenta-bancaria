import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CabeceraComponent } from './layout';
import { AltaPersonaComponent } from './lista';
import { RegistrarPersonaComponent, FormLugarComponent } from './formulario';
import { CrearPersonaContent, CrearPersonaComponent } from './modal';

@NgModule({
  declarations: [
    CabeceraComponent,
    AltaPersonaComponent,
    RegistrarPersonaComponent, FormLugarComponent,
    CrearPersonaContent, CrearPersonaComponent,

  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    CabeceraComponent,
    AltaPersonaComponent,
    RegistrarPersonaComponent, FormLugarComponent,
    CrearPersonaContent, CrearPersonaComponent,
  ]
})
export class SharedModule { }
