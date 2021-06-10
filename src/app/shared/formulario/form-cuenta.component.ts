import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'shared-form-cuenta',
  templateUrl: './form-cuenta.component.html',
  styleUrls: ['./form-cuenta.component.scss']
})
export class FormCuentaComponent implements OnInit {
  public cuenta: FormGroup; /** formulario de cuenta {object} los valores del objeto de cuenta son: bancoid, cbu  */
  public submitted: boolean; /** estado de validacion de formulario {boolean} */
  @Input("listaBanco") listaBanco: any; /** listado que contiene los bancos */
  @Input("personaid") public personaid: number /**identificador de una persona */
  @Output("obtenerRespuesta") obtenerRespueta = new EventEmitter(); /** Devuelve la respuesta despues de haber realizado el guarado o cancelado del un formulario */

  constructor(private _fb: FormBuilder) {
    this.cuenta = _fb.group({
      bancoid: ['', [Validators.required]],
      cbu: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  validarCuenta() {
    if (this.cuenta.invalid){
      return;
    } else {
      this.submitted = false;
      let cuenta = this.cuenta.value;
      cuenta["personaid"] = this.personaid
      // let id = this.personaid;
      this.guardar(cuenta);
    }
  }

  guardar(params: object) {
    this.obtenerRespueta.emit(true);
  }

  cancelarForm() {
    this.obtenerRespueta.emit(false);
  }

}
