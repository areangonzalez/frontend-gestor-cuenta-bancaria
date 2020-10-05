import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { configurarListas, ConfigurarPagina } from 'src/app/core/models';
import { ConfiguracionParaPaginarService, NotificacionService, PersonaService } from 'src/app/core/services';

@Component({
  selector: 'vista-alta-cuenta-persona',
  templateUrl: './alta-cuenta-persona.component.html',
  styleUrls: ['./alta-cuenta-persona.component.scss'],
})
export class AltaCuentaPersonaComponent implements OnInit {
  public global_param: string = '';
  public personas: any = [];
  public listas = {} as configurarListas;
  public filtradoBusqueda: any = {};
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de comprobantes

  constructor(private _route: ActivatedRoute, private _configurarPaginacion: ConfiguracionParaPaginarService, private _personaService: PersonaService, private _msj: NotificacionService) { }

  ngOnInit(): void {
    this.prepararListadoPersona(this._route.snapshot.data["personas"], 1);
    this.listas.seleccionPersona = [];
    this.listas.subSucursales = this._route.snapshot.data["subSucursales"];
  }

  obtenerPersona(persona: any) {
    this.listas.seleccionPersona.push(persona);
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

  public realizarBusqueda(params: any, page: number) {
    Object.assign(params, {page: page-1});
    this.filtradoBusqueda = params;
    this._personaService.buscar(params).subscribe(
      respuesta => {
        this.prepararListadoPersona(respuesta, page)
      }, error => { this._msj.cancelado(error); }
    )
  }

}
