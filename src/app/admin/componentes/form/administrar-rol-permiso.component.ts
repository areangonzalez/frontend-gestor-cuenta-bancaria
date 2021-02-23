import { Component, Input, OnInit } from '@angular/core';
import { NotificacionService, UsuarioService } from './../../../core/services';

@Component({
  selector: 'admin-administrar-rol-permiso-form',
  templateUrl: './administrar-rol-permiso.component.html',
  styleUrls: ['./administrar-rol-permiso.component.scss']
})
export class AdministrarRolPermisoComponent implements OnInit {
  @Input("idUsuario") private idUsuario: number;
  @Input("listaPermisos") public listaPermisos: any;
  @Input("baja") public baja: boolean;
  public listaUsuarioConPermisos: any = [];
  public permisosSeleccionados: any = [];

  constructor(private _msj: NotificacionService, private _usuarioService: UsuarioService) {}

  ngOnInit() {
    this.obtenerListaPermisos(this.idUsuario);
  }

  obtenerListaPermisos(idUsuario: number) {
    this._usuarioService.listarAsignacion(idUsuario).subscribe(
      listado => {
        this.listaUsuarioConPermisos = listado;
      }, error => { this._msj.cancelado(error); }
    )
  }
  /**
   * al seleccionar un programa ya viene definido un permiso
   * @param programaid identificador de programa
   */
  setPermisosDefault(programaid: any) {
    this.permisosSeleccionados = (programaid != "") ? [{ name: "prestacion_ver" }] : [];
  }
  /**
   * Valido los datos antes de asignar los permisos
   */
  validarDatos() {
    console.log(this.permisosSeleccionados);

    if (this.permisosSeleccionados.length == 0) {
      this._msj.cancelado("No se ha seleccionado ningun permiso");
      return;
    }else{
      let params: any  = {
        usuarioid: this.idUsuario,
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
