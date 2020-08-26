import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'layout-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {
  public isCollapsed = true;
  public mostrar: boolean = false;
  public nombreUsuario: string = '';
  public estoyLogueado:boolean = false;

  constructor( private _router: Router ) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    /* this._loader.show();
      setTimeout(() => {
        this._autenticacion.logout();
        this._loader.hide();
        this._router.navigate(['/login']);
       }, 1000); */
  }

  mostrarMenu(){
    this.mostrar = !this.mostrar;
  }

  ocultarMenu(){
    this.mostrar = false;
  }

}
