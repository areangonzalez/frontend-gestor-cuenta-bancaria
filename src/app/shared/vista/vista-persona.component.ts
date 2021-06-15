import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vista-persona',
  templateUrl: './vista-persona.component.html',
  styleUrls: ['./vista-persona.component.scss']
})
export class VistaPersonaComponent implements OnInit {
  @Input("persona") public persona: any;
  @Input("listaBancos") public listaBancos: any;
  @Output("actualizarDatos") public actualizarDatos = new EventEmitter(); // devolucion de un valor booleano el cual define la actualizacion de datos
  constructor() { }

  ngOnInit(): void {
  }

  public actualizacion(dato: boolean) {
    this.actualizarDatos.emit(dato);
  }

}
