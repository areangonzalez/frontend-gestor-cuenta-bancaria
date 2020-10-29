import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { PersonaComponent } from './persona.component';
import { EstadoCivilService, GeneroService, LocalidadService, NacionalidadService, PersonaService, SexoService, TipoDocumentoService } from '../core/services';
import { AuthGuard } from '../core/guards/auth.guard';

const routes = [
  {
    path: '',
    component: PersonaComponent,
    canActivateChild: [AuthGuard],
    resolve: {
      personas: PersonaService, localidades: LocalidadService
    }
    //data: { title: 'Datos de persona' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PersonaService, TipoDocumentoService, LocalidadService, NacionalidadService, EstadoCivilService, SexoService, GeneroService]
})
export class PersonaRoutingModule { }
