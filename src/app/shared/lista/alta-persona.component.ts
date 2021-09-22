import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { configurarListas } from 'src/app/core/models';
import { NotificacionService, UtilService, PrestacionService } from 'src/app/core/services';

@Component({
  selector: 'shared-lista-alta-persona',
  templateUrl: './alta-persona.component.html',
  styleUrls: ['./alta-persona.component.scss']
})
export class AltaPersonaComponent implements OnInit {
  @Input("personas") public listadoPersonas: any;
  @Input("config-listas") public configurarListas: configurarListas; // array que contiene el/los listados para el componente
  @Input("tipo") public tipo: string;
  @Input("configPaginacion") public configPaginacion: any;
  @Output("seleccionDePersona") public seleccionDePersona = new   EventEmitter();
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();
  @Output("cuilPersona") public cuilPersona = new EventEmitter();
  @Output("guardoPrestacion") public guardoPrestacion = new EventEmitter();
  public copiaDeDatos: any = { existe: false };

  constructor(private _msj: NotificacionService, private _prestacionService: PrestacionService, private _utils: UtilService) { }

  ngOnInit(): void {
  }
  /**
   * Envio al componente padre el numero de pagina
   * @param pagina numero de pagina
   */
  cambioPagina(pagina:number){
    this.cambioDePagina.emit(pagina);
  }
  /**
   * obtengo los datos guardados en el formulario y los agrego a la persona que se le fue asignada
   * @param persona objeto que contiene los datos a persona
   * @param sucursal datos de la sucursal obtenidos del formulario
   */
   confirmacionPrestacion(confirmacion: boolean) {
     if (confirmacion) {
       this.guardoPrestacion.emit(confirmacion);
     }
  }
  /**
   * Armo una cadena de texto con los datos de direccion de la persona para el tooltip
   * @param lugar objeto que contiene los datos de direccion de una persona
   */
  public direccion(lugar: object){
    let dir = "";
    dir += lugar['localidad'];
    dir += (lugar['barrio'] != '') ? " - " + lugar['barrio'] + ' - ' + lugar['calle'] + ' ' + lugar['altura']: ' - ' + lugar['calle'] + ' ' + lugar['altura'];
    dir += (lugar['escalera'] != '') ? ' - ' + lugar['escalera'] : '';
    dir += (lugar['piso'] != '') ? ' - ' + lugar['piso'] : '';
    dir += (lugar['depto'] != '') ? ' - ' + lugar['depto'] : '';

    return dir;
  }
  /**
   * al modificar una persona obtengo su numero de cuil
   */
  obtenerCuilPersona(datosPersona: any) {
    this.cuilPersona.emit(datosPersona.cuil);
  }

  obtenerCbu(cuentas: any) {
    let cbu: string = '';
    for (let i = 0; i < cuentas.length; i++) {
      cbu += (cbu != '') ? ' - ' : '';
      cbu = cuentas[i]["cbu"];
    }

    return cbu;
  }

  actualizarListado(actualizar: boolean, cuilPersona: string) {
    if (actualizar) {
      this.cuilPersona.emit(cuilPersona);
    }
  }

  esPendiente(pendiente: boolean, enEspera: boolean, observacion: string, fecha_pedido: string) {
    let texto: string = (observacion != "") ? "Observación: " + observacion: "";
    if (pendiente == true) {
      return "Esperando respuesta del banco desde "+ this._utils.darFormatoAfecha(fecha_pedido, 'dd/MM/yyyy') +". " + texto;
    }
    if (enEspera == true) {
      return "Esperando a ser exportado. " + texto;
    }
  }

  rechazarPrestacion(confirmacion: boolean, idPersona: number, cuilPersona: string) {
    if (confirmacion === true) {
      this._prestacionService.borrarPendiente(idPersona).subscribe(
        respuesta => {
          this.cuilPersona.emit(cuilPersona);
        }, error => { this._msj.cancelado(error); })
    }
  }

}
