import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { PersonaComponent } from './persona.component';
import { EstadoCivilService, GeneroService, LocalidadService, NacionalidadService, PersonaService, SexoService, TipoDocumentoService } from '../core/services';

const routes = [
  {
    path: '',
    component: PersonaComponent,
    resolve: {
      personas: PersonaService, tipoDocumentos: TipoDocumentoService, localidades: LocalidadService,
      nacionalidades: NacionalidadService, estadoCiviles: EstadoCivilService, sexos: SexoService,
      generos: GeneroService
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
