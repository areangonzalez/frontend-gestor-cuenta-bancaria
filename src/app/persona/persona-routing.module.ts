import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { PersonaComponent } from './persona.component';
import { CuentaService, EstadoCivilService, GeneroService, LocalidadService, NacionalidadService, SexoService, TipoDocumentoService } from '../core/services';
import { AuthGuard } from '../core/guards/auth.guard';

const routes = [
  {
    path: '',
    component: PersonaComponent,
    canActivateChild: [AuthGuard],
    resolve: {
      personas: CuentaService, localidades: LocalidadService, tipoDocumentos: TipoDocumentoService, nacionalidades: NacionalidadService, estadoCiviles: EstadoCivilService, sexos: SexoService, generos: GeneroService
    },
    data: { title: 'Tesorería', rol: ['usuario', 'admin'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LocalidadService, CuentaService]
})
export class PersonaRoutingModule { }
