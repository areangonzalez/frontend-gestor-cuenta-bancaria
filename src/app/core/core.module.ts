import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoaderService, UtilService, TitleService, NotificacionService, ConfiguracionParaPaginarService, JwtService, ApiService, AutenticacionService, PersonaService, SubSucursalService, EstadoCivilService, GeneroService, NacionalidadService, LocalidadService, SexoService,
  TipoDocumentoService, CuentaSaldoService, CuentaService, UsuarioService, ArchivoService, PermisosService, RolService, ExportService, BancoServiceService, PrestacionService,
  ProvinciaService, DepartamentoService, BackendLocalidadService, LocalidadExtraService
 } from "./services";

@NgModule({
  declarations: [
    LoaderService, UtilService, TitleService, NotificacionService, ConfiguracionParaPaginarService, JwtService, ApiService, AutenticacionService, PersonaService, SubSucursalService, EstadoCivilService, GeneroService, NacionalidadService, LocalidadService, SexoService,
    TipoDocumentoService, CuentaSaldoService, CuentaService, UsuarioService, ArchivoService, PermisosService, RolService, ExportService, BancoServiceService, PrestacionService,
    ProvinciaService, DepartamentoService, BackendLocalidadService, LocalidadExtraService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
