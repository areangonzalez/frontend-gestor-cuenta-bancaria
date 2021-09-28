import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExportService, NotificacionService } from 'src/app/core/services';
import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: 'he-historial-listado',
  templateUrl: './historial-listado.component.html',
  styleUrls: ['./historial-listado.component.scss']
})
export class HistorialListadoComponent {
  @Input("historial") public historial: any;
  @Input("listaTipoConvenio") public listaTipoConvenio: any;
  @Input("configPaginacion") public configPaginacion: any;
  @Output("cambiarPagina") public cambiarPagina = new EventEmitter();
  page = 4;

  constructor(private _msj: NotificacionService, private _exportService: ExportService) { }

  descargarArchivo(exportar: boolean, idArchivo: number, tipo: string) {
    let filename: string = '';
    let falla: boolean = false;
    if (exportar){
      this._exportService.descargarArchivo(idArchivo).subscribe(
        respuesta => {
          let blob = new Blob([respuesta["exportacion"]], {type:"text/plain;charset=utf-8"});
          switch (tipo) {
            case 'ctasaldo':
              filename = 'CTASALDO.txt';
              importedSaveAs(blob, filename);

              break;
            case 'interbanking':
              filename = 'interbanking.txt';
              importedSaveAs(blob, filename);
              break;
            default:
              falla = true;
              this._msj.cancelado('Disculpe, No se ha podido descargar el archivo.');
              break;
          }
          if (!falla) {
            setTimeout(() => {
              this._msj.exitoso("Se ha descargado correctamente el archivo");
              this.cambioPagina(this.configPaginacion.page);
            }, 800);
          }
      }, error => {
        this.tipoError(error);
      });
    }
  }
  /**
   * verifico si el error del servidor es de tipo string
   * @param error dato recibido del api
   */
  private tipoError(error: any) {
    if (typeof error === 'string') {
      this._msj.cancelado(error);
    }else{
      let msjObject = JSON.parse(error);
      this._msj.cancelado(msjObject);
    }
  }
  /**
   * cambio la pagina del listado
   * @param pagina numero de pagina
   */
  cambioPagina(pagina:number) {
    this.cambiarPagina.emit(pagina);
  }
}
