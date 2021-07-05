import { Component, Input, OnInit } from '@angular/core';
import { ConfigurarPagina } from 'src/app/core/models';
import { ConfiguracionParaPaginarService, LocalidadExtraService, NotificacionService } from './../../../core/services';

@Component({
  selector: 'admin-localidad-extra-lista',
  templateUrl: './localidad-extra-lista.component.html',
  styleUrls: ['./localidad-extra-lista.component.scss']
})
export class LocalidadExtraListaComponent implements OnInit {
  @Input("listados") public listados: any;
  public busqueda: any = {};
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina();
  public tamanioPagina: number = 20;
  public tamanioPaginaLista: any = [];
  public localidadesExtras: any = [];

  constructor(private _configPagina: ConfiguracionParaPaginarService, private _localidadExtraService: LocalidadExtraService, private _msj: NotificacionService) { }

  ngOnInit(): void {
    this.prepararListado(this.listados.localidadesExtras, 1);
  }
  /**
   * Borra una localidad del listado mediante la confirmacion del usuario con su permiso
   * @param confirmacion valor booleano que confirma o no (true/false) el borrado de la localidad
   * @param id numero identificador de la localidad a borrar
   */
  public borrarLocalidadExtra(confirmacion: boolean, id: number) {
    if (confirmacion) {
      this._localidadExtraService.borrar(id).subscribe(
        respuesta => {
          this._msj.exitoso("Se ha borrado la localidad del listado extra con exito.");
        }, error => { this._msj.cancelado(error); }
      )
    }
  }

  /**
   * @function buscar busca en listado
   * @param apiBusqueda parametros de filtracion
   */
   public realizarBusqueda(apiBusqueda:any, page: number) {
    // Agrego la paginacion a la busqueda avanzada
    Object.assign(apiBusqueda, {page: page-1, pagesize: this.tamanioPagina});
    // agrego la busqueda en la nueva variable
    this.busqueda = apiBusqueda;
    // configuro para que se dirija a la primera pagina
    this.configPaginacion.page = 1;
    // realizo la busqueda
    this._localidadExtraService.buscar(apiBusqueda).subscribe(
      respuesta => {
        this.prepararListado(respuesta, page);
      }, error => { this._msj.cancelado(error); }
    )
  }
  prepararListado(listado:any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configPagina.config(listado, pagina);

    this.localidadesExtras = listado.resultado;
    this.tamanioPaginaLista = [{size: 10}, {size: 20}, {size: 50}, {size: 100}];
  }
  /**
   * Solicito el cambio de pagina
   * @param pagina numero de pagina
   */
  cambiarPagina(pagina:any) {
    this.realizarBusqueda(this.busqueda, pagina);
  }

  cambiarTamanioPagina(size: number) {
    this.tamanioPagina = size;
    this.realizarBusqueda(this.busqueda, this.configPaginacion.page);
  }
}
