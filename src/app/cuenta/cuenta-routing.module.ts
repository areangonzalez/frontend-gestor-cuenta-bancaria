import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CuentaComponent } from './cuenta.component';

const routes = [
  {
    path: '',
    component: CuentaComponent
    //data: { title: 'Datos de persona' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
