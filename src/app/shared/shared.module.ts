import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule, NgbDatepickerModule, NgbCollapseModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CabeceraComponent, PieComponent } from './layout';
import { AltaPersonaComponent } from './lista';
import { RegistrarPersonaComponent, FormLugarComponent } from './formulario';
import { CrearPersonaContent, CrearPersonaComponent, AgregarSucursalContent, NotidicacionModalContent, AgregarSucursalComponent, ConfirmarExportacionModalContent, ConfirmarExportacionComponent, InfoPersonaContent, InfoPersonaComponent, EditarPersonaContent, EditarPersonaComponent } from './modal';
import { VistaPersonaComponent } from './vista';
import { BusquedaAvanzadaPersonaComponent } from "./busqueda";

@NgModule({
  declarations: [
    CabeceraComponent, PieComponent,
    AltaPersonaComponent,
    RegistrarPersonaComponent, FormLugarComponent,
    CrearPersonaContent, CrearPersonaComponent,
    AgregarSucursalContent, NotidicacionModalContent, AgregarSucursalComponent,
    ConfirmarExportacionModalContent, ConfirmarExportacionComponent,
    InfoPersonaContent, InfoPersonaComponent,
    VistaPersonaComponent,
    EditarPersonaContent, EditarPersonaComponent,
    BusquedaAvanzadaPersonaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule,
    NgbTooltipModule, NgbDatepickerModule, NgbCollapseModule, NgbPaginationModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbTooltipModule, NgbDatepickerModule, NgbCollapseModule,
    CabeceraComponent, PieComponent,
    AltaPersonaComponent,
    RegistrarPersonaComponent, FormLugarComponent,
    CrearPersonaContent, CrearPersonaComponent,
    AgregarSucursalContent, NotidicacionModalContent, AgregarSucursalComponent,
    ConfirmarExportacionModalContent, ConfirmarExportacionComponent,
    InfoPersonaContent, InfoPersonaComponent,
    VistaPersonaComponent,
    EditarPersonaContent, EditarPersonaComponent,
    BusquedaAvanzadaPersonaComponent
  ]
})
export class SharedModule { }
