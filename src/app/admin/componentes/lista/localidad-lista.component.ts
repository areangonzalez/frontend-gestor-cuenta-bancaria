import { Component, Input, OnInit } from '@angular/core';
import { ConfigurarPagina } from 'src/app/core/models';
import { ConfiguracionParaPaginarService, BackendLocalidadService, LocalidadExtraService, NotificacionService } from './../../../core/services';

@Component({
  selector: 'admin-localidad-lista',
  templateUrl: './localidad-lista.component.html',
  styleUrls: ['./localidad-lista.component.scss']
})
export class LocalidadListaComponent implements OnInit {
  @Input("listados") public listados: any;
  public busqueda: any = {};
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina();
  public tamanioPagina: number = 20;
  public tamanioPaginaLista: any = [];
  public backendLocalidades: any = [];
  public nombreLocalidadGuardada: string = '';

  constructor(private _configPagina: ConfiguracionParaPaginarService, private _localidadExtraService: LocalidadExtraService, private _msj: NotificacionService, private _backendLocalidadService: BackendLocalidadService) { }

  ngOnInit(): void {
    this.prepararListado(this.listados.backendLocalidades, 1);
  }
  /**
   * agrega una localidad en el listado extra
   * @param confirmacion valor booleano que indica la confirmacion del agregado
   * @param id numero identificador de la localidad a agregar
   */
  agregarLocalidadExtra(confirmacion: boolean, id:number) {
    if (confirmacion) {
      this._localidadExtraService.guardar(id).subscribe(
        respuesta => {
          this._msj.exitoso("Se ha agreado correctamente la localidad en listado extras.");
          this.cambiarPagina(this.configPaginacion.page);
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
    this._backendLocalidadService.buscar(apiBusqueda).subscribe(
      respuesta => {
        this.prepararListado(respuesta, page);
      }, error => { this._msj.cancelado(error); }
    )
  }
  prepararListado(listado:any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configPagina.config(listado, pagina);

    this.backendLocalidades = listado.resultado;
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
  actualizarRegistro(confirmacion: any) {
    if (confirmacion.confirma) {
      this.nombreLocalidadGuardada = confirmacion.nombreLocalidad;
      this.realizarBusqueda({nombre: this.nombreLocalidadGuardada}, this.configPaginacion.page);
    }
  }
}
