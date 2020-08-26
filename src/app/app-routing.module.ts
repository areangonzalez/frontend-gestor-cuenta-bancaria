import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { SistemaComponent, LoginComponent } from './shared';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: SistemaComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
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
