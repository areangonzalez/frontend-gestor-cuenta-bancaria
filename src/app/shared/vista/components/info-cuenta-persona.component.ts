import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-vista-component-info-cuenta-persona',
  templateUrl: './info-cuenta-persona.component.html',
  styleUrls: ['./info-cuenta-persona.component.scss']
})
export class InfoCuentaPersonaComponent implements OnInit {
  @Input("listaCuentas") public listaCuentas: any;
  @Input("listaBancos") public listaBancos: any;

  constructor() { }

  ngOnInit(): void {
  }

}
