import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-cuenta-persona',
  templateUrl: './alta-cuenta-persona.component.html',
  styleUrls: ['./alta-cuenta-persona.component.scss']
})
export class AltaCuentaPersonaComponent implements OnInit {
  public global_param: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
