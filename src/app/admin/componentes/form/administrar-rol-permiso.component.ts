import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionService, UsuarioService, PermisosService } from './../../../core/services';

@Component({
  selector: 'admin-administrar-rol-permiso-form',
  templateUrl: './administrar-rol-permiso.component.html',
  styleUrls: ['./administrar-rol-permiso.component.scss']
})
export class AdministrarRolPermisoComponent implements OnInit {
  @Input("idUsuario") private idUsuario: number;
  @Input("listaRoles") public listaRoles: any;
  @Input("baja") public baja: boolean;
  public listaPermisos: any = [];
  public user: FormGroup;
  public submitted: boolean = false;
  public listaUsuarioConPermisos: any = {lista_permiso: []};
  public permisosSeleccionados: any = [];

  constructor(private _msj: NotificacionService, private _usuarioService: UsuarioService, private _fb: FormBuilder, private _permisoService: PermisosService) {
    this.user = _fb.group({
      rol: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.obtenerListaPermisos(this.idUsuario);
  }
  /**
   * Obtiene el listado de permisos del usuario
   * @param idUsuario identificador del usuario
   */
  obtenerListaPermisos(idUsuario: number) {
    this._usuarioService.listarAsignacion(idUsuario).subscribe(
      listado => {
        console.log(listado);

        this.listaUsuarioConPermisos = listado;
      }, error => { this._msj.cancelado(error); }
    )
  }
  /**
   * Valido los datos antes de asignar los permisos
   */
  validarDatos() {
    if (this.user.invalid) {
      return;
    }else{
      let params: any  = {
        usuarioid: this.idUsuario,
        rol: this.user.value.rol,
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

  listarPermisos() {
    let rol = (this.user.value.rol !== "") ? this.user.value.rol : "";
    if (rol !== "") {
      this._permisoService.permisoPorRol(rol).subscribe(
        respuesta => {
          this.listaPermisos = respuesta;
        }, error => { this._msj.cancelado(error); }
      )
    }else{
      this.listaPermisos = [];
    }
  }
}
