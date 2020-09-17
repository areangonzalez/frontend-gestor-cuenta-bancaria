import { Component, OnInit } from '@angular/core';
import { configurarListas } from '../core/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {
  public configListas: configurarListas = {};
  public personas: any = [];

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.personas = this._route.snapshot.data["personas"];
    this.configListas.estado_civil = this._route.snapshot.data["estadoCiviles"];
    this.configListas.genero = this._route.snapshot.data["generos"];
    this.configListas.localidades = this._route.snapshot.data["localidades"];
    this.configListas.nacionalidad = this._route.snapshot.data["nacionalidades"];
    this.configListas.sexo = this._route.snapshot.data["sexos"];
    this.configListas.tipo_documento = this._route.snapshot.data["tipoDocumentos"];
  }

}
