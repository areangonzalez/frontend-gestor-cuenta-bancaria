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
  @Input("configPaginacion") public configPaginacion: any;
  @Output("cambiarPagina") public cambiarPagina = new EventEmitter();
  page = 4;

  constructor(private _msj: NotificacionService, private _exportService: ExportService) { }

  descargarArchivo(exportar: boolean, idArchivo: number, tipo: string) {
    let filename: string = '';
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
              this._msj.cancelado('Disculpe, No se ha podido descargar el archivo.');
              break;
          }

          setTimeout(() => {
            this._msj.exitoso("Se ha descargado correctamente el archivo");
            this.cambioPagina(1);
          }, 800);
      }, error => {
        let msjObject = JSON.parse(error);
        this._msj.cancelado(msjObject);
      });
    }
  }

  cambioPagina(pagina:number) {
    this.cambiarPagina.emit(pagina);
  }
}
