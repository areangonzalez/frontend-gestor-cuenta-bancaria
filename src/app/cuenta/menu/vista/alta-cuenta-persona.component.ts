import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { configurarListas } from 'src/app/core/models';

@Component({
  selector: 'app-alta-cuenta-persona',
  templateUrl: './alta-cuenta-persona.component.html',
  styleUrls: ['./alta-cuenta-persona.component.scss'],
})
export class AltaCuentaPersonaComponent implements OnInit {
  public global_param: string = '';
  public listas = {} as configurarListas;
  public listadoPersonasSeleccionadas: any = [];

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listas.seleccionPersona = this.listadoPersonasSeleccionadas;
    this.listas.personas = this._route.snapshot.data["personas"];
    this.listas.subSucursales = this._route.snapshot.data["subSucursales"];
  }

  obtenerPersona(persona: any) {
    this.listadoPersonasSeleccionadas.push(persona);
  }

}
