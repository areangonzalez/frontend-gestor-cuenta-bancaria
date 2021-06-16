import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CuentaService, NotificacionService } from 'src/app/core/services';

@Component({
  selector: 'vista-persona',
  templateUrl: './vista-persona.component.html',
  styleUrls: ['./vista-persona.component.scss']
})
export class VistaPersonaComponent implements OnInit {
  @Input("persona") public persona: any;
  @Input("listaBancos") public listaBancos: any;
  @Output("actualizarDatos") public actualizarDatos = new EventEmitter(); // devolucion de un valor booleano el cual define la actualizacion de datos

  constructor(private _cuentaService: CuentaService, private _msj: NotificacionService) { }

  ngOnInit(): void {
  }

  public actualizacion(dato: boolean) {
    this.actualizarDatos.emit(dato);
  }

  public borrarCbu(confirmacion: boolean, idCuenta: number) {
    if (confirmacion) {
      this._cuentaService.borrar(idCuenta).subscribe(
        respuesta => {
          this.actualizacion(true);
          this._msj.exitoso("Se ha borrado la cuenta bancaria correctamente.");
        },
        error => { this._msj.cancelado(error); })
    }
  }

}
