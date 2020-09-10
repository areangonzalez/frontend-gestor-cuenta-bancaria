import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilService, JwtService, ApiService, AutenticacionService, PersonaService, SubSucursalService } from "./services";

@NgModule({
  declarations: [
    UtilService, JwtService, ApiService, AutenticacionService, PersonaService, SubSucursalService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
