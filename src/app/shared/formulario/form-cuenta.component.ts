import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cuenta',
  templateUrl: './form-cuenta.component.html',
  styleUrls: ['./form-cuenta.component.scss']
})
export class FormCuentaComponent implements OnInit {
  @Input("cuenta") cuenta: FormGroup; /** formulario de cuenta {object} los valores del objeto de cuenta son: bancoid, cbu  */
  @Input("submitted") submitted: boolean; /** estado de validacion de formulario {boolean} */
  @Input("listadoBanco") listadoBanco: any; /** listado que contiene los bancos */

  constructor() { }

  ngOnInit(): void {
  }

}
