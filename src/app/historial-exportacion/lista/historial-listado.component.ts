import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificacionService } from 'src/app/core/services';

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

  constructor(private _msj: NotificacionService) { }

  descargarArchivo(idArchivo: number) {
    this._msj.exitoso("Se ha descargado correctamente el archivo");
  }

  cambioPagina(pagina:number) {
    this.cambiarPagina.emit(pagina);
  }
}
