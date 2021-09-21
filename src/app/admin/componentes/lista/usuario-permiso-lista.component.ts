import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService, NotificacionService } from './../../../core/services';

@Component({
  selector: 'admin-usuario-permiso-lista',
  templateUrl: './usuario-permiso-lista.component.html',
  styleUrls: ['./usuario-permiso-lista.component.scss']
})
export class UsuarioPermisoListaComponent implements OnInit {
  @Input("listaConvenioPermisos") public listaConvenioPermisos: any;

  constructor(private _usuarioService: UsuarioService, private _msj: NotificacionService) { }

  ngOnInit(): void {
  }
  /**
   * borra los permisos del programa que le pertenecen al usuario
   * @param datos objeto que contiene los datos del programa con sus permisos
   * @param confirmacion confirmacion de parte del usuario para dar o no acceso al borrado
   */
  borrarDato(datos: any, confirmacion: boolean) {
    console.log(datos);

    if (confirmacion) {
      let idUsuario = datos.usuarioid;
      this._usuarioService.borrarAsignacion(datos).subscribe(
        repsuesta => {
          this._msj.exitoso("Se han borrado los permisos.");
          this.actualizarListado(idUsuario);
        }, error => { this._msj.cancelado(error); }
      );
    }
  }
  /**
   * Actuliza el listado de los permisos por programa
   * @param idUsuario identificador del usuario que sirve para obtener el listado del mismo
   */
  actualizarListado(idUsuario: number) {
    this._usuarioService.listarAsignacion(idUsuario).subscribe(
      listado => { this.listaConvenioPermisos = listado; },
      error => { this._msj.cancelado(error); }
    )
  }

}
