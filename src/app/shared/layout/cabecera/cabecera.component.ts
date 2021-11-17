import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { AutenticacionService, LoaderService } from 'src/app/core/services';

@Component({
  selector: 'layout-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {
  public isCollapsed = true;
  public mostrar: boolean = false;
  public nombreUsuario: string = '';
  public isAdmin: boolean = false;

  constructor( private _router: Router,  private _auth: AutenticacionService, private _loading: LoaderService ) { }

  ngOnInit(): void {
    this.setNombreUsuario();
  }

  cerrarSesion() {
    this._loading.show();
      setTimeout(() => {
        this._auth.logout();
        this._loading.hide();
        this._router.navigate(['/login']);
       }, 1000);
  }

  mostrarMenu(){
    this.mostrar = !this.mostrar;
  }

  ocultarMenu(){
    this.mostrar = false;
  }

  estoyLogueado(){
    return true;
  }

  setNombreUsuario() {
    if (this._auth.loggedIn.apellido && this._auth.loggedIn.nombre && this._auth.loggedIn.rol !== 'admin') {
      this.nombreUsuario = this._auth.loggedIn.apellido + ", " + this._auth.loggedIn.nombre;
    }else{
      this.nombreUsuario = "Admin";
      this.isAdmin = true;
    }
  }

}
