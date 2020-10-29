import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CuentaComponent } from './cuenta.component';
import { AltaCuentaPersonaComponent, ImportacionCbuComponent } from './menu';
import { CuentaSaldoService, EstadoCivilService, GeneroService, LocalidadService, NacionalidadService, PersonaService, SexoService, SubSucursalService, TipoDocumentoService } from '../core/services';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CuentaComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'alta', component: AltaCuentaPersonaComponent,
        data: { title: 'Alta de cuentas', breadcrumb: 'Alta' },
        resolve: {
          personas: PersonaService, subSucursales: SubSucursalService, seleccionPersona: CuentaSaldoService, tipoDocumentos: TipoDocumentoService, localidades: LocalidadService,
          nacionalidades: NacionalidadService, estadoCiviles: EstadoCivilService, sexos: SexoService,
          generos: GeneroService
        }
      },
      {
        path: 'importacion', component: ImportacionCbuComponent,
        data: { title: 'Importación de CBU', breadcrumb: 'importación' },
        resolve: {
          localidades: LocalidadService, personas: PersonaService
        }
      },
      { path: '', redirectTo: 'alta', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CuentaSaldoService, PersonaService, SubSucursalService, LocalidadService, NacionalidadService, PersonaService, SexoService, SubSucursalService, TipoDocumentoService]
})
export class CuentaRoutingModule { }
