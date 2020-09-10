import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alta-cuenta-persona',
  templateUrl: './alta-cuenta-persona.component.html',
  styleUrls: ['./alta-cuenta-persona.component.scss'],
})
export class AltaCuentaPersonaComponent implements OnInit {
  public global_param: string = '';
  public listaPersona: any = [];
  public listadoPersonasSeleccionadas: any = [];

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listaPersona = this._route.snapshot.data["personas"];
  }

  obtenerPersona(persona: any) {
    this.listadoPersonasSeleccionadas.push(persona);
  }

}
