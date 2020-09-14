import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CabeceraComponent } from './layout';
import { AltaPersonaComponent } from './lista';
import { RegistrarPersonaComponent, FormLugarComponent } from './formulario';
import { CrearPersonaContent, CrearPersonaComponent, AgregarSucursalContent, NotidicacionModalContent, AgregarSucursalComponent } from './modal';

@NgModule({
  declarations: [
    CabeceraComponent,
    AltaPersonaComponent,
    RegistrarPersonaComponent, FormLugarComponent,
    CrearPersonaContent, CrearPersonaComponent,
    AgregarSucursalContent, NotidicacionModalContent, AgregarSucursalComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbTooltipModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbTooltipModule,
    CabeceraComponent,
    AltaPersonaComponent,
    RegistrarPersonaComponent, FormLugarComponent,
    CrearPersonaContent, CrearPersonaComponent,
    AgregarSucursalContent, NotidicacionModalContent, AgregarSucursalComponent
  ]
})
export class SharedModule { }
