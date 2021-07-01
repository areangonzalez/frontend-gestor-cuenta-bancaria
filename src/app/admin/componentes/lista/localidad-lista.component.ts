import { Component, Input, OnInit } from '@angular/core';
import { configurarListas } from 'src/app/core/models';

@Component({
  selector: 'admin-localidad-lista',
  templateUrl: './localidad-lista.component.html',
  styleUrls: ['./localidad-lista.component.scss']
})
export class LocalidadListaComponent implements OnInit {
  @Input("localidades") public localidades: any;
  @Input("provincias") public provincias: any;

  constructor() { }

  ngOnInit(): void {
  }

}
