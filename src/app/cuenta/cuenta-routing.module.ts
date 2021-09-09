import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CuentaComponent } from './cuenta.component';
import { AltaCuentaPersonaComponent, ImportacionCbuComponent } from './menu';
import { BancoServiceService, CuentaSaldoService, EstadoCivilService, GeneroService, LocalidadService, NacionalidadService, PersonaService, SexoService, SubSucursalService, TipoDocumentoService } from '../core/services';
import { AuthGuard } from '../core/guards/auth.guard';
import { ArchivoService } from '../core/services/archivo.service';

const routes: Routes = [
  {
    path: '',
    component: CuentaComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'alta', component: AltaCuentaPersonaComponent,
        data: { title: 'Alta de Convenio', breadcrumb: 'Alta de Convenio', rol: ['usuario', 'admin'] },
        resolve: {
          personas: PersonaService, subSucursales: SubSucursalService, seleccionPersona: CuentaSaldoService, tipoDocumentos: TipoDocumentoService, localidades: LocalidadService, nacionalidades: NacionalidadService, estadoCiviles: EstadoCivilService, sexos: SexoService, generos: GeneroService, bancos: BancoServiceService
        }
      },
      {
        path: 'importacion', component: ImportacionCbuComponent,
        data: { title: 'Importación de Cuentas', breadcrumb: 'Importación de Cuentas', rol: ['usuario', 'admin'] },
        resolve: {
          localidades: LocalidadService, personas: ArchivoService, tipoDocumentos: TipoDocumentoService, nacionalidades: NacionalidadService, estadoCiviles: EstadoCivilService, sexos: SexoService, generos: GeneroService, bancos: BancoServiceService
        }
      },
      { path: '', redirectTo: 'alta', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CuentaSaldoService, PersonaService, SubSucursalService, LocalidadService, NacionalidadService, PersonaService, SexoService, SubSucursalService, TipoDocumentoService, BancoServiceService]
})
export class CuentaRoutingModule { }
