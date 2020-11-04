import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderService, UtilService, NotificacionService, ConfiguracionParaPaginarService, JwtService, ApiService, AutenticacionService, PersonaService, SubSucursalService, EstadoCivilService, GeneroService, NacionalidadService, LocalidadService, SexoService, TipoDocumentoService, CuentaSaldoService, CuentaService, ArchivoService } from "./services";

@NgModule({
  declarations: [
    LoaderService, UtilService, NotificacionService, ConfiguracionParaPaginarService, JwtService, ApiService, AutenticacionService, PersonaService, SubSucursalService, EstadoCivilService, GeneroService, NacionalidadService, LocalidadService, SexoService, TipoDocumentoService, CuentaSaldoService, CuentaService, ArchivoService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
