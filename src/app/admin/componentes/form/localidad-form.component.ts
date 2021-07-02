import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendLocalidadService, DepartamentoService, NotificacionService, UtilService } from './../../../core/services';

@Component({
  selector: 'admin-localidad-form',
  templateUrl: './localidad-form.component.html',
  styleUrls: ['./localidad-form.component.scss']
})
export class LocalidadFormComponent implements OnInit {
  @Input("provincias") public provincias: any; // array que contiene el/los listados para el componente
  @Input("localidad") public localidad?: any;
  @Output("cancelarForm") public cancelarForm = new EventEmitter();
  public localidadForm: FormGroup;
  public submitted: boolean = false;
  public departamentos: any = [];
  public localidades: any = [];

  constructor(private _fb: FormBuilder, private _departamentoService: DepartamentoService, private _localidadService: BackendLocalidadService, private _msj: NotificacionService, private _util: UtilService) {
    this.localidadForm = _fb.group({
      id: '',
      nombre: ['', [Validators.required]],
      codigo_postal: ['', [Validators.required, Validators.minLength(4)]],
      departamentoid: ['', [Validators.required]],
      provinciaid: ''
    });
  }

  ngOnInit(): void {
    if (this.localidad) {
      this.departamentoPorProvincia(this.localidad.provinciaid);

      this.localidadForm.patchValue(this.localidad);

    }
  }

  public departamentoPorProvincia(valor: any) {
    if (valor != "") {
      let provinciaid = parseInt(valor);
      this._departamentoService.buscarPorProvinciaId(provinciaid).subscribe(
        respuesta => {
          this.departamentos = respuesta;
        }, error => { this._msj.cancelado(error); }
      );
    }else{
      this.departamentos = [];
    }
  }

  public cancelar() {
    this.cancelarForm.emit(false);
  }

  validarForm() {
    this.submitted = true;
    if (this.localidadForm.invalid) {
      return;
    }else{
      let params = this.localidadForm.value;
      if (params.id != '') { // editar
        this._localidadService.guardar(params, params.id).subscribe(
          respuesta => {
            this._msj.exitoso("Se ha editado Correctamente la localidad");
            this.cancelarForm.emit(true);
          }, error => { this._msj.cancelado(error); }
          );
        } else {
        this._localidadService.guardar(params).subscribe(
          respuesta => {
            this._msj.exitoso("Se ha guardado correctamente la localidad");
            this.cancelarForm.emit(true);
          }, error => { this._msj.cancelado(error); }
        );
      }
    }
  }

  /**
   * @function soloNumero valida que los datos ingresados en un input sean solo numeros.
   * @param datos objeto que contiene los datos de un input.
   */
   public soloNumero(datos:any){
    if (!this._util.validarNumero(datos.value)) {
      datos.value = datos.value.substring(0,datos.value.length - 1);
    }
  }

}
