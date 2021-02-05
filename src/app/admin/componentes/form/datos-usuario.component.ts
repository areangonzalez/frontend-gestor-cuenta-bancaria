import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'admin-datos-usuario-form',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.scss']
})
export class DatosUsuarioComponent implements OnInit {
  @Input("localidades") public localidades: any;
  @Input("listaRoles") public listaRoles: any;
  @Input("usuario") public usuario: FormGroup;
  @Input("submitted") public submitted: boolean;
  @Input("baja") public baja: boolean;

  constructor() { }

  ngOnInit() {}
  /**
   * convierte el email a minuscula, si el usuario esta escribiendo en mayuscula
   * @param palabra {string} texto que esta siendo tipeado
   */
  public aMinuscula(palabra:any){
    palabra.value = palabra.value.toLowerCase();
  }
}
