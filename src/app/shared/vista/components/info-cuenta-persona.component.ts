import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CuentaService, NotificacionService } from 'src/app/core/services';

@Component({
  selector: 'shared-vista-component-info-cuenta-persona',
  templateUrl: './info-cuenta-persona.component.html',
  styleUrls: ['./info-cuenta-persona.component.scss']
})
export class InfoCuentaPersonaComponent implements OnInit {
  @Input("listaCuentas") public listaCuentas: any;
  @Input("listaBancos") public listaBancos: any;
  @Output("actualizarLista") public actualizarLista = new EventEmitter();

  constructor(private _cuentaService: CuentaService, private _msj: NotificacionService) { }

  ngOnInit(): void {
  }
  /**
   * Al obtener la respuesta del editado, envia al componente padre el pedido de
   * de actualización del listado
   * @param dato boolean respuesta recibida true/false
   */
  public actualizarDatos(dato: boolean) {
    this.actualizarLista.emit(dato);
  }

  public confirmacion(confirmar: boolean, cuentaid: number) {
    this._cuentaService.borrar(cuentaid).subscribe(
      respuesta => {
        this.actualizarLista.emit(true);
        this._msj.exitoso("Se ha borrado la cuenta bancaria correctamente.");
      }, error => { this._msj.cancelado(error); })
  }

}
