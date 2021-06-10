import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { configurarListas, ConfigurarPagina } from 'src/app/core/models';
import { ArchivoService, ConfiguracionParaPaginarService, NotificacionService } from 'src/app/core/services';
import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: 'vista-importacion-cbu',
  templateUrl: './importacion-cbu.component.html',
  styleUrls: ['./importacion-cbu.component.scss']
})
export class ImportacionCbuComponent implements OnInit {
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de comprobantes
  public personas:any = [];
  public global_param:string = '';
  public configListas: configurarListas = {};
  public filtradoBusqueda: any = {};

  constructor( private _route: ActivatedRoute, private _cuentaService: ArchivoService, private _msj: NotificacionService, private _configurarPaginacion: ConfiguracionParaPaginarService ) { }

  ngOnInit(): void {
    this.prepararListadoPersona(this._route.snapshot.data["personas"], 1);
    this.configListas.estado_civil = this._route.snapshot.data["estadoCiviles"];
    this.configListas.genero = this._route.snapshot.data["generos"];
    this.configListas.nacionalidad = this._route.snapshot.data["nacionalidades"];
    this.configListas.sexo = this._route.snapshot.data["sexos"];
    this.configListas.tipo_documento = this._route.snapshot.data["tipoDocumentos"];
    this.configListas.localidades = this._route.snapshot.data["localidades"];
    this.configListas.seleccionPersona = [];
  }

  public realizarBusqueda(params: any, page: number) {
    Object.assign(params, {page: page-1});
    this.filtradoBusqueda = params;
    this._cuentaService.listaCuentaBps(params).subscribe(
      respuesta => {
        this.prepararListadoPersona(respuesta, page)
      }, error => { this._msj.cancelado(error); }
    )
  }
  /**
   * preparo el listado y la configuracion de paginacion
   * @param listado listado de personas
   * @param pagina numero de pagina
   */
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

  actualizarListado(datos: any) {
    if (!datos["esError"]) { // si no es error muestro mensaje exitoso
      this._msj.importacionExitoso(datos["mensaje"]);
      this.realizarBusqueda({}, 1);
    }else{ // si es error notifico al usuario
      this._msj.cancelado(datos["mensaje"]);
    }
  }

  /**
   * Permite descargar un archivo de texto
   */
  public exportarArchivo(exportar:boolean) {
    if (exportar){
      this._cuentaService.exportarCtaInterbanking().subscribe(
        respuesta => {
          let blob = new Blob([respuesta["interbanking"]], {type:"text/plain;charset=utf-8"});

          let filename = 'interbanking.txt';
          importedSaveAs(blob, filename);

          setTimeout(() => {
            this._msj.exitoso(respuesta["message"]);
            this.realizarBusqueda({}, 1);
          }, 800);
      }, error => {
        this.tipoError(error);
      });
    }
  }

  private tipoError(error: any) {
    if (typeof error === 'string') {
      this._msj.cancelado(error);
    }else{
      let msjObject = JSON.parse(error);
      this._msj.cancelado(msjObject);
    }
  }

}
