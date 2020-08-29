import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { PersonaComponent } from './persona.component';

const routes = [
  {
    path: '',
    component: PersonaComponent
    //data: { title: 'Datos de persona' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaRoutingModule { }
