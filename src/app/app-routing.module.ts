import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  /* {
    path: 'login',
    loadChildren: () => import('nombre-path').then(m => m.NombreModulo)
  } */
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
