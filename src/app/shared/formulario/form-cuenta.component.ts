import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService, UtilService, CuentaService } from 'src/app/core/services';

@Component({
  selector: 'shared-form-cuenta',
  templateUrl: './form-cuenta.component.html',
  styleUrls: ['./form-cuenta.component.scss']
})
export class FormCuentaComponent implements OnInit {
  public cuenta: FormGroup; /** formulario de cuenta {object} los valores del objeto de cuenta son: bancoid, cbu  */
  public submitted: boolean; /** estado de validacion de formulario {boolean} */
  private idCuenta: number;
  @Input("listaBanco") listaBanco: any; /** listado que contiene los bancos */
  @Input("personaid") public personaid: number /**identificador de una persona */
  @Input("datosCuenta") public datosCuenta: any; /** datos de la cuenta solo para edicion */
  @Output("obtenerRespuesta") obtenerRespueta = new EventEmitter(); /** Devuelve la respuesta despues de haber realizado el guarado o cancelado del un formulario */

  constructor(private _fb: FormBuilder, private _util: UtilService, private _msj: NotificacionService, private _cuentaService: CuentaService) {
    this.cuenta = _fb.group({
      bancoid: ['', [Validators.required]],
      cbu: ['', [Validators.required, Validators.minLength(22)]]
    })
  }

  ngOnInit(): void {
    if (this.datosCuenta) {
      this.completarFormulario(this.datosCuenta);
    }
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
      if (this.idCuenta) {
        this.guardar(cuenta, this.idCuenta);
      }else {
        this.guardar(cuenta);
      }
    }
  }

  private guardar(params: object, id?: number) {
    if (id) {
      this._cuentaService.guardar(params, id).subscribe(
        respuesta => {
          this.obtenerRespueta.emit(true);
          this._msj.exitoso("Se ha registrado el CBU de la persona correctamente. Ya esta preparado para dar de alta en tesorería.");
        }, error => { this._msj.cancelado(error); }
      )
    }else{
      this._cuentaService.guardar(params).subscribe(
        respuesta => {
          this.obtenerRespueta.emit(true);
          this._msj.exitoso("Se ha cambiado el CBU de la persona correctamente. Ya esta preparado para el alta de tesorería.");
        }, error => { this._msj.cancelado(error); }
      )
    }
  }

  public cancelarForm() {
    this.obtenerRespueta.emit(false);
  }

  public esNumero(datos: any) {
    if (!this._util.validarNumero(datos.value)) {
      datos.value = datos.value.substring(0,datos.value.length - 1);
    }
  }

  private completarFormulario(cuenta: object) {
    this.cuenta.patchValue({bancoid: cuenta["bancoid"]});
    this.cuenta.patchValue({cbu: cuenta["cbu"]});
    this.idCuenta = cuenta["id"];
  }

}
