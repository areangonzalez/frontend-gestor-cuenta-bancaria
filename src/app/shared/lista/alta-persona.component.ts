import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-lista-alta-persona',
  templateUrl: './alta-persona.component.html',
  styleUrls: ['./alta-persona.component.scss']
})
export class AltaPersonaComponent implements OnInit {
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

}
