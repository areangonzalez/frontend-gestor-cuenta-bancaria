import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { configurarListas } from 'src/app/core/models';
import { NotificacionService } from 'src/app/core/services';

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
  public copiaDeDatos: any = { existe: false };

  constructor(private _msj: NotificacionService) { }

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
  obtengoSeleccionDeSucursal(persona: any, sucursal: any) {
    persona["sucursal_id"] = sucursal.id;
    persona["sucursal_codigo_postal"] = sucursal.codigo_postal;
    persona["sucursal_codigo"] = sucursal.codigo;
    persona["prestacion_monto"] = sucursal.monto;
    persona["prestacion_fecha_ingreso"] = sucursal.fecha_ingreso;

    this.copiarDatosSeleccionados(sucursal);

    this.seleccionDePersona.emit(persona);
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
   * Pego los datos copiados en la seleccion anterior en una persona nueva,
   * si la persona ya ha sido seleccionada se le notifica con un mensaje de error al usuario
   * @param persona objeto que contiene los datos de la persona seleccionada
   * @param copia objeto que contiene los datos que han sido copiado en una seleccion anterior
   */
  pegarCopiaSeleccionada(persona: any, copia: any) {
    let personaSeleccionada: boolean = false;
    for (let i = 0; i < this.configurarListas.seleccionPersona.length; i++) {
      if (this.configurarListas.seleccionPersona[i].id === persona.id) {
        this._msj.cancelado("¡Esta persona ya ha sido seleccionada!");
        personaSeleccionada = true;
      }
    }

    if (!personaSeleccionada) {
      persona["sucursal_id"] = copia.id;
      persona["sucursal_codigo_postal"] = copia.codigo_postal;
      persona["sucursal_codigo"] = copia.codigo;
      persona["prestacion_monto"] = copia.monto;
      persona["prestacion_fecha_ingreso"] = copia.fecha_ingreso;

      this.seleccionDePersona.emit(persona);
    }

  }
  /**
   * copio los datos seleccionados de una persona y los asigno a una nueva variable
   * @param copia datos obtenidos del formulario
   */
  copiarDatosSeleccionados(copia:any) {
    this.copiaDeDatos.existe = true;
    Object.assign(this.copiaDeDatos, copia);
  }

}
