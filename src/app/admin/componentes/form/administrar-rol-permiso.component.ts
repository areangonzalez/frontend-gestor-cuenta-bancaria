import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NotificacionService, UsuarioService, PermisosService } from './../../../core/services';

@Component({
  selector: 'admin-administrar-rol-permiso-form',
  templateUrl: './administrar-rol-permiso.component.html',
  styleUrls: ['./administrar-rol-permiso.component.scss']
})
export class AdministrarRolPermisoComponent implements OnInit {
  @Input("idUsuario") private idUsuario: number;
  @Input("listaConvenio") public listaConvenio: any;
  @Input("listaPermisos") public listaPermisos: any;
  @Input("baja") public baja: boolean;
  public listaConvenioPermisos: any = [{ lista_coonvenio: { lista_permiso: [] }}];
  public permisosSeleccionados: any = [];
  public datos: FormGroup;
  public submitted: boolean = false;

  constructor(private _msj: NotificacionService, private _usuarioService: UsuarioService, private _fb: FormBuilder) {
    this.datos = _fb.group({
      convenioid: ['', [Validators.required]]
    });
  }

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
        this.listaConvenioPermisos = respuesta;
      }, error => { this._msj.cancelado(error); }
    )
  }
  /**
   * Valido los datos antes de asignar los permisos
   */
  validarDatos() {
    this.submitted = true;
    if (this.datos.invalid) {
      return;
    }else if (this.permisosSeleccionados.length == 0) {
      this._msj.cancelado("No se ha seleccionado ningun permiso.");
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
