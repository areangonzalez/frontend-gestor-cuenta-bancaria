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
  public copiaDeDatos: any = { existe: false, sucursal_codigo_postal: '', sucursal_codigo: '' };

  constructor(private _msj: NotificacionService) { }

  ngOnInit(): void {
  }

  cambioPagina(pagina:number){
    this.cambioDePagina.emit(pagina);
  }

  obtengoSeleccionDeSucursal(persona: any, sucursal: any) {
    persona["sucursal_codigo_postal"] = sucursal.codigo_postal;
    persona["sucursal_codigo"] = sucursal.codigo;

    this.copiarDatosSeleccionados(sucursal);

    this.seleccionDePersona.emit(persona);
  }

  public direccion(lugar: object){
    let dir = "";
    dir += lugar['localidad'];
    dir += (lugar['barrio'] != '') ? " - " + lugar['barrio'] + ' - ' + lugar['calle'] + ' ' + lugar['altura']: ' - ' + lugar['calle'] + ' ' + lugar['altura'];
    dir += (lugar['escalera'] != '') ? ' - ' + lugar['escalera'] : '';
    dir += (lugar['piso'] != '') ? ' - ' + lugar['piso'] : '';
    dir += (lugar['depto'] != '') ? ' - ' + lugar['depto'] : '';

    return dir;
  }

  pegarCopiaSeleccionada(persona: any, copia: any) {
    let personaSeleccionada: boolean = false;
    for (let i = 0; i < this.configurarListas.seleccionPersona.length; i++) {
      if (this.configurarListas.seleccionPersona[i].id === persona.id) {
        this._msj.cancelado("¡Esta persona ya ha sido seleccionada!");
        personaSeleccionada = true;
      }
    }

    if (!personaSeleccionada) {
      persona["sucursal_codigo_postal"] = copia.codigo_postal;
      persona["sucursal_codigo"] = copia.codigo;

      this.seleccionDePersona.emit(persona);
    }

  }

  copiarDatosSeleccionados(copia:any) {
    this.copiaDeDatos.existe = true;
    this.copiaDeDatos.sucursal_codigo = copia.sucursal_codigo;
    this.copiaDeDatos.sucursal_codigo_postal = copia.sucursal_codigo_postal;
  }

}
