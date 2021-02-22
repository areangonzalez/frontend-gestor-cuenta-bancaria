import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-usuario-info',
  templateUrl: './usuario-info.component.html',
  styleUrls: ['./usuario-info.component.scss']
})
export class UsuarioInfoComponent implements OnInit {
  @Input("datosUsuario") public datosUsuario: any;

  constructor() { }

  ngOnInit(): void {
  }

}
