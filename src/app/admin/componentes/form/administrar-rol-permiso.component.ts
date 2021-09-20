import { Component, Input, OnInit } from '@angular/core';
import { NotificacionService, UsuarioService, PermisosService } from './../../../core/services';

@Component({
  selector: 'admin-administrar-rol-permiso-form',
  templateUrl: './administrar-rol-permiso.component.html',
  styleUrls: ['./administrar-rol-permiso.component.scss']
})
export class AdministrarRolPermisoComponent implements OnInit {
  @Input("idUsuario") private idUsuario: number;
  @Input("listaRoles") public listaRoles: any;
  @Input("listaPermisos") public listaPermisos: any;
  @Input("baja") public baja: boolean;
  public listaUsuarioConRolyPermisos: any = {lista_permiso: []};
  public rolesSeleccionados: any = [];
  public permisosSeleccionados: any = [];

  constructor(private _msj: NotificacionService, private _usuarioService: UsuarioService) {}

  ngOnInit() {
    this.obtenerListaPermisos(this.idUsuario);
  }
  /**
   * Obtiene el listado de roles con sus permisos del usuario
   * @param idUsuario identificador del usuario
   */
  obtenerListaPermisos(idUsuario: number) {
    this._usuarioService.listarAsignacion(idUsuario).subscribe(
      respuesta => {
        console.log(respuesta);

        // guardo el listado con roles y sus permisos
        this.listaUsuarioConRolyPermisos = respuesta;
      }, error => { this._msj.cancelado(error); }
    )
  }
  /**
   * Valido los datos antes de asignar los permisos
   */
  validarDatos() {
    if (this.rolesSeleccionados.length == 0) {
      this._msj.cancelado("No se ha seleccionado ningun rol.");
      return;
    }else if (this.permisosSeleccionados.length == 0) {
      this._msj.cancelado("No se ha seleccionado ningun permiso.");
      return;
    }else{
      let params: any  = {
        usuarioid: this.idUsuario,
        lista_rol: this.rolesSeleccionados,
        lista_permiso: this.permisosSeleccionados
      };

      this.guardar(params)
    }
  }
  /**
   * se asignan los permisos al usuario
   * @param params listado de permisos con el id del usuario
   */
  guardar(params: object) {
    this._usuarioService.asignarPermisos(params).subscribe(
      respuesta => {
        this._msj.exitoso("Se han agregado correctamente el programa y los permisos al usuario.");
        this.obtenerListaPermisos(this.idUsuario);
      }, error => { this._msj.cancelado(error); }
    );
  }

}
