import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService, UtilService } from 'src/app/core/services';

@Component({
  selector: 'shared-form-cuenta',
  templateUrl: './form-cuenta.component.html',
  styleUrls: ['./form-cuenta.component.scss']
})
export class FormCuentaComponent implements OnInit {
  public cuenta: FormGroup; /** formulario de cuenta {object} los valores del objeto de cuenta son: bancoid, cbu  */
  public submitted: boolean; /** estado de validacion de formulario {boolean} */
  public msjErrorCbu: string = '';
  public errorCbu: boolean = false;
  @Input("listaBanco") listaBanco: any; /** listado que contiene los bancos */
  @Input("personaid") public personaid: number /**identificador de una persona */
  @Output("obtenerRespuesta") obtenerRespueta = new EventEmitter(); /** Devuelve la respuesta despues de haber realizado el guarado o cancelado del un formulario */

  constructor(private _fb: FormBuilder, private _util: UtilService, private _msj: NotificacionService) {
    this.cuenta = _fb.group({
      bancoid: ['', [Validators.required]],
      cbu: ['', [Validators.required, Validators.minLength(22)]]
    })
  }

  ngOnInit(): void {
  }

  public validarCuenta() {
    this.submitted = true;
    if (this.cuenta.invalid){
      return;
    } else {
      this.submitted = false;
      let cuenta = this.cuenta.value;
      cuenta["personaid"] = this.personaid;
      // let id = this.personaid;
      this.guardar(cuenta);
    }
  }

  private guardar(params: object) {
    this._msj.exitoso("Se ha registrado el CBU de la persona correctamente.")
    this.obtenerRespueta.emit(true);
  }

  public cancelarForm() {
    this.obtenerRespueta.emit(false);
  }

  public esNumero(datos: any) {
    if (!this._util.validarNumero(datos.value)) {
      datos.value = datos.value.substring(0,datos.value.length - 1);
    }
  }

}
