import { Component } from '@angular/core';
import { NotificacionService } from 'src/app/core/services';

@Component({
  selector: 'he-historial-listado',
  templateUrl: './historial-listado.component.html',
  styleUrls: ['./historial-listado.component.scss']
})
export class HistorialListadoComponent {

  public historial: any = [
    { id: 1, create_at: "2020-04-03", tipo_exportacion: "Cuenta Saldo", cantidad: 40 },
    { id: 2, create_at: "2020-03-25", tipo_exportacion: "Cuenta Saldo", cantidad: 45 },
    { id: 3, create_at: "2020-03-12", tipo_exportacion: "Interbanking", cantidad: 35 },
    { id: 4, create_at: "2020-03-01", tipo_exportacion: "Cuenta Saldo", cantidad: 35 },
    { id: 5, create_at: "2020-02-24", tipo_exportacion: "Interbanking", cantidad: 20 },
    { id: 6, create_at: "2020-02-15", tipo_exportacion: "Cuenta Saldo", cantidad: 20 },
  ];

  constructor(private _msj: NotificacionService) { }

  descargarArchivo(idArchivo: number) {
    this._msj.exitoso("Se ha descargado correctamente el archivo");
  }

}
