import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService, NotificacionService } from './../../../core/services';

@Component({
  selector: 'admin-usuarios-lista',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  @Input("listados") public listados: any;
  @Input("configPaginacion") public configPaginacion: any;
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();
  @Output("cambioDeTamanioPagina") public cambioDeTamanioPagina = new EventEmitter();
  public tamanioPagina: number = 20;

  constructor(private _usuarioService: UsuarioService, private _msj: NotificacionService) { }

  ngOnInit(): void {
  }

  /**
   * Envio al componente padre el numero de pagina
   * @param pagina numero de pagina
   */
   cambioPagina(pagina:number){
    this.cambioDePagina.emit(pagina);
  }

  cambioTamanioPagina(size: number) {
    this.tamanioPagina = size;
    this.cambioDeTamanioPagina.emit(size);
  }


  darBajaUsuario(baja:any, usuarioid: number) {
    if (baja.confirmacion) {
      baja['baja'] = true;
      this._usuarioService.baja(baja, usuarioid).subscribe(
        resultado => {
          this._msj.exitoso("El usuario a sido dado de baja correctamente.");
          this.cambioPagina(this.configPaginacion.page);
        }, error => { this._msj.cancelado(error); })
    }
  }

  /*darAltaUsuario(alta:any, usuarioid: number) {
    if (alta.confirmacion) {
      alta["baja"] = false;
      console.log(alta);

      this._usuarioService.baja(alta, usuarioid).subscribe(
        resultado => {
          this._msj.exitoso("El usuario a sido habilitado correctamente.", [{name:""}]);
          this.cambioPagina(this.configPaginacion.page);
        }, error => { this._msj.cancelado(error, [{name:''}]); })
    }
  } */
  public infoAdicional(fecha_baja) {
    if (fecha_baja) {
      return "Fecha de Baja: " + fecha_baja;
    }
  }

}
