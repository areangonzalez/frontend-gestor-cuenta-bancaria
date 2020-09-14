import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { PersonaComponent } from './persona.component';
import { PersonaService } from '../core/services';

const routes = [
  {
    path: '',
    component: PersonaComponent,
    resolve: { personas: PersonaService }
    //data: { title: 'Datos de persona' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PersonaService]
})
export class PersonaRoutingModule { }
