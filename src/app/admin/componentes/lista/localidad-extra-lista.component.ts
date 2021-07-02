import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-localidad-extra-lista',
  templateUrl: './localidad-extra-lista.component.html',
  styleUrls: ['./localidad-extra-lista.component.scss']
})
export class LocalidadExtraListaComponent implements OnInit {
  @Input("localidadesExtra") public localidadesExtra: any

  constructor() { }

  ngOnInit(): void {
  }

}
