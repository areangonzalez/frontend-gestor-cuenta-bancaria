import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-configuracion-tab',
  templateUrl: './configuracion-tab.component.html',
  styleUrls: ['./configuracion-tab.component.scss']
})
export class ConfiguracionTabComponent implements OnInit {
  @Input("datosUsuario") public datosUsuario: any;

  constructor() { }

  ngOnInit(): void {
  }

}
