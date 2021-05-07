import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfigurarPagina } from '../core/models';
import { ConfiguracionParaPaginarService, ExportService, NotificacionService } from '../core/services';

@Component({
  selector: 'app-historial-exportacion',
  templateUrl: './historial-exportacion.component.html',
  styleUrls: ['./historial-exportacion.component.scss']
})
export class HistorialExportacionComponent implements OnInit {
  public historial: any;
  public filtradoBusqueda: any = {};
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de comprobantes


  constructor(
    private _route: ActivatedRoute, private _configurarPaginacion: ConfiguracionParaPaginarService,
    private _exportService: ExportService, private _msj: NotificacionService
  ) { }

  ngOnInit(): void {
    this.prepararListado(this._route.snapshot.data["historial"], 1);
  }

  prepararListado(listado: any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configurarPaginacion.config(listado, pagina);

    this.historial = listado.resultado;
  }

  realizarBusqueda(params: any, pagina: number) {
    Object.assign(params, {page: pagina-1, paginasize: 20});
    this.filtradoBusqueda = params;
    this._exportService.buscar(params).subscribe(
      respuesta => {
        this.prepararListado(respuesta, pagina)
      }, error => { this._msj.cancelado(error); }
    )
  }

  cambiarPagina(pagina: number) {
    console.log(pagina)
    this.realizarBusqueda(this.filtradoBusqueda, pagina);
  }

}
