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

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.configListas.personas = this._route.snapshot.data["personas"];
  }

}
