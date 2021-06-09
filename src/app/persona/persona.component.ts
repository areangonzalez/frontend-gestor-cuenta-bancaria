import { Component, OnInit } from '@angular/core';
import { configurarListas, ConfigurarPagina } from '../core/models';
import { ActivatedRoute } from '@angular/router';
import { ConfiguracionParaPaginarService, NotificacionService, CuentaService } from '../core/services';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {
  public configListas: configurarListas = {};
  public personas: any = [];
  public filtradoBusqueda: any = {};
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de comprobantes

  constructor(private _route: ActivatedRoute, private _cuentaService: CuentaService, private _msj: NotificacionService, private _configurarPaginacion: ConfiguracionParaPaginarService) {}

  ngOnInit(): void {
    this.prepararListadoPersona(this._route.snapshot.data["personas"], 1);
    this.configListas.localidades = this._route.snapshot.data["localidades"];
    this.configListas.estado_civil = this._route.snapshot.data["estadoCiviles"];
    this.configListas.genero = this._route.snapshot.data["generos"];
    this.configListas.nacionalidad = this._route.snapshot.data["nacionalidades"];
    this.configListas.sexo = this._route.snapshot.data["sexos"];
    this.configListas.tipo_documento = this._route.snapshot.data["tipoDocumentos"];
    this.configListas.bancos = this._route.snapshot.data["bancos"];
  }

  public realizarBusqueda(params: any, page: number) {
    Object.assign(params, {page: page-1, pagesize: 20});
    this.filtradoBusqueda = params;
    this._cuentaService.buscar(params).subscribe(
      respuesta => {
        this.prepararListadoPersona(respuesta, page)
      }, error => { this._msj.cancelado(error); }
    )
  }

  prepararListadoPersona(listado:any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configurarPaginacion.config(listado, pagina);

    this.personas = listado.resultado;
  }
  /**
   * reinicia el listado a sin parametros de busqueda
   * @param e
   */
  limpiarCampos(e: boolean) {
    this.realizarBusqueda({}, 1);
  }
  /**
   * Solicito el cambio de pagina
   * @param pagina numero de pagina
   */
  cambiarPagina(pagina:any) {
    this.realizarBusqueda(this.filtradoBusqueda, pagina);
  }

  actualizarLista(cuil: string) {
    this.realizarBusqueda({}, 1);
  }

}
