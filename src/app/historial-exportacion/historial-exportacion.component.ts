import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfigurarPagina } from '../core/models';
import { ConfiguracionParaPaginarService } from '../core/services';

@Component({
  selector: 'app-historial-exportacion',
  templateUrl: './historial-exportacion.component.html',
  styleUrls: ['./historial-exportacion.component.scss']
})
export class HistorialExportacionComponent implements OnInit {
  public historial: any;
  public listado = {
    page: 0, pageSize: 20, total_filtrado: 45,
    resultado: [

  ]};
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de comprobantes


  constructor(private _route: ActivatedRoute, private _configurarPaginacion: ConfiguracionParaPaginarService) { }

  ngOnInit(): void {
    this.prepararListado(this._route.snapshot.data["historial"], 1);
  }

  prepararListado(listado: any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configurarPaginacion.config(listado, pagina);

    this.historial = listado.resultado;
  }

}
