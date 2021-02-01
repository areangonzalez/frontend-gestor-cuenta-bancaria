import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-usuarios-lista',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  @Input("listados") public listados: any;


  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Envio al componente padre el numero de pagina
   * @param pagina numero de pagina
   */
  /* cambioPagina(pagina:number){
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
          this._msj.exitoso("El usuario a sido dado de baja correctamente.", [{name:""}]);
          this.cambioPagina(this.configPaginacion.page);
        }, error => { this._msj.cancelado(error, [{name:''}]); })
    }
  }

  darAltaUsuario(alta:any, usuarioid: number) {
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
