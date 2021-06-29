import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-localidad-lista',
  templateUrl: './localidad-lista.component.html',
  styleUrls: ['./localidad-lista.component.scss']
})
export class LocalidadListaComponent implements OnInit {
  @Input("localidad") public localidad: any;

  constructor() { }

  ngOnInit(): void {
  }

}
