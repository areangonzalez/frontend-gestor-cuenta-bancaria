import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-usuarios-lista',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  public usuarioLista: any = [
    {id: 1, nombre: "Carlos", apellido: "Garcia", username: "cgarcia", created_at: "1560617468681", fecha_baja: "", baja: false, last_login_at: "2020-12-30",  direccion_ip: "192.10.10.8" },
    {id: 2, nombre: "Maria", apellido: "Gonzalez", username: "mgonzalez", created_at: "2019-04-02", fecha_baja: "", baja: false, last_login_at: "2020-12-20", direccion_ip: "192.10.10.8" },
    {id: 3, nombre: "Graciela", apellido: "Perez", username: "gperez", created_at: "2019-05-03", fecha_baja: "2020-12-05", baja: true, last_login_at: "2020-12-30", direccion_ip: "192.10.10.8" },
    {id: 4, nombre: "Paola", apellido: "Rodriguez", username: "prodriguez", created_at: "2019-08-06", fecha_baja: "", baja: false, last_login_at: "2020-12-23", direccion_ip: "192.10.10.8" },
    {id: 5, nombre: "Gustavo", apellido: "Acosta", username: "gacosta", created_at: "2019-11-21", fecha_baja: "", baja: false, last_login_at: "2020-12-29", direccion_ip: "192.10.10.8" },
  ];


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
