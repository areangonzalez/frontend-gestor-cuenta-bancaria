import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { configurarListas } from 'src/app/core/models';

@Component({
  selector: 'shared-lista-alta-persona',
  templateUrl: './alta-persona.component.html',
  styleUrls: ['./alta-persona.component.scss']
})
export class AltaPersonaComponent implements OnInit {
  @Input("config-listas") public configurarListas: configurarListas; // array que contiene el/los listados para el componente
  @Input("tipo") public tipo: string;
  @Output("seleccionDePersona") public seleccionDePersona = new EventEmitter();

  public configPaginacion = { colleccionSize: 30, page: 1, pageSize: 20 }

  constructor() { }

  ngOnInit(): void {
  }

  cambioPagina(pagina:number){
    console.log(pagina);
  }

  obtengoSeleccionDeSucursal(persona: any, sucursal: any) {
    persona["sucursal_codigo_postal"] = sucursal.codigo_postal;
    persona["sucursal_codigo"] = sucursal.codigo;

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

}
