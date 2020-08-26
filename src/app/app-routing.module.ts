import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CabeceraComponent } from './shared';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  }
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
