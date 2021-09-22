import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalConfig, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService, AutenticacionService } from 'src/app/core/services';

@Component({
  selector: 'content-agregar-sucursal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Crear Prestación</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="d-flex justify-content-end">
        <small class="text-danger">(*) Campos obligatorios</small>
      </div>
        <fieldset [formGroup]="sucursalForm">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="convenio">Convenio (<span class="text-danger">*</span>)</label>
                <select class="form-control" id="convenio" formControlName="convenioid" [ngClass]="{'is-invalid': (sucursalForm.get('convenioid').invalid && submitted)}">
                  <option value="">Seleccionar Sucursal</option>
                  <option *ngFor="let convenio of convenios" value="{{convenio.id}}">{{convenio.nombre}}</option>
                </select>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label for="fecha_nacimiento">Fecha prestación (<span class="text-danger">*</span>)</label>
                <div class="input-group">
                  <input class="form-control" #c1 placeholder="Ej.: dd/mm/yyyy" ngbDatepicker #fpd="ngbDatepicker"
                  id="fecha_nacimiento" formControlName="fechaIngreso" (ngModelChange)="formatFecha($event)" [ngClass]="{'is-invalid': (sucursalForm.get('fechaIngreso').invalid && submitted)}" >
                  <div class="input-group-append">
                      <button class="btn btn-outline-info" (click)="fpd.toggle()" type="button" [ngClass]="{'btn-outline-danger': (sucursalForm.get('fechaIngreso').invalid && submitted), 'is-invalid': (sucursalForm.get('fechaIngreso').invalid && submitted)}">
                        <i class="far fa-calendar-alt"></i>
                      </button>
                  </div>
                </div>
                <div *ngIf="(sucursalForm.get('fechaIngreso').invalid && submitted)" class="text-danger">
                    <span>Por favor ingrese una fecha.</span>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label for="monto">Monto (<span class="text-danger">*</span>)</label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">$</div>
                  </div>
                  <input type="text" id="monto" placeholder="Ej.: 1000" class="form-control" formControlName="monto" (keyup)="validarMoneda($event.target)" [ngClass]="{'is-invalid': (sucursalForm.get('monto').invalid && submitted)}">
                </div>
              </div>
              <div *ngIf="(sucursalForm.get('monto').invalid && submitted)" class="text-danger">
                  <span>Por favor ingrese un monto.</span>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label for="sucursal">Sucursal (<span class="text-danger">*</span>)</label>
                <select class="form-control" id="sucursal" formControlName="sucursal" [ngClass]="{'is-invalid': (sucursalForm.get('sucursal').invalid && submitted)}">
                  <option value="">Seleccionar Sucursal</option>
                  <option *ngFor="let sucursal of subSucursales" [ngValue]="sucursal">{{sucursal.nombre}}</option>
                </select>
              </div>
              <div *ngIf="(sucursalForm.get('sucursal').invalid && submitted)" class="text-danger">
                  <span>Por favor seleccione una sucursal.</span>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label for="observacion">Observación</label>
                <textarea class="form-control" id="observacion" formControlName="observacion" rows="2"></textarea>
              </div>
            </div>
          </div>
        </fieldset>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="cerrarModal()"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" class="btn btn-outline-success" (click)="validarPersona()"><i class="fas fa-plus"></i> Agregar</button>
    </div>
`,
})
export class AgregarSucursalContent {
  @Input("subSucursales") public subSucursales:any;
  @Input("convenios") public convenios:any;
  public sucursalForm: FormGroup;
  public submitted: boolean = false;
  public prestacion: any = {};

  constructor(public activeModal: NgbActiveModal, private _fb:FormBuilder, private _util: UtilService, private _configNgbDate: NgbDatepickerConfig, private _auth: AutenticacionService) {
    this.sucursalForm = _fb.group({
      convenioid: '',
      sucursal: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      fecha_ingreso: '',
      fechaIngreso: ['', [Validators.required]],
      observacion: ''
    });
    // configuracion de fecha en combos
    _configNgbDate.minDate = {year: 1900, month: 1, day: 1};
    // datos del usuairo logueado

  }
  /* public convenioDelUsuario() {
    let datosUsuario = this._auth.loggedIn;
    return (datosUsuario.convenio)
  } */
  /**
   * Cierro el modal
   */
  cerrarModal() {
    this.activeModal.close(false);
  }
  /**
   * Validación de los datos del formulario
   */
  validarPersona() {
    this.submitted = true;
    if ( this.sucursalForm.invalid ) {
      return;
    }else{
      this.prestacion = {
        monto: this.sucursalForm.value.monto,
        fecha_ingreso: this.sucursalForm.value.fecha_ingreso,
        fechaIngreso: this.sucursalForm.value.fechaIngreso,
        sub_sucursalid: this.sucursalForm.value.sucursal.id,
        localidad: this.sucursalForm.value.sucursal.localidad,
        codigo_postal: this.sucursalForm.value.sucursal.codigo_postal,
        codigo: this.sucursalForm.value.sucursal.codigo,
        sucursalid: this.sucursalForm.value.sucursal.sucursalid,
        nombre: this.sucursalForm.value.sucursal.nombre,
        sucursal_codigo: this.sucursalForm.value.sucursal.sucursal_codigo,
        observacion: this.sucursalForm.value.observacion
      };

      this.activeModal.close(this.prestacion);
    }
  }
  /**
   * @function formatFechaNaciento convierte la fecha en un string
   * @param obj la fecha viene en formato objeto
   */
  public formatFecha(obj:any){
    this.sucursalForm.patchValue({fecha_ingreso: this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd")});
  }
  /**
   * valido que la moneda sea numero
   * @param moneda valor a verificar
   */
  public validarMoneda(moneda) {
    if (!this._util.validarMoneda(moneda.value)) {
      moneda.value = moneda.value.substring(0, moneda.value.length -1);
    }
  }
}

@Component({
  selector: 'modal-agregar-sucursal',
  templateUrl: './agregar-sucursal.component.html',
  styleUrls: ['./agregar-sucursal.component.scss']
})
export class AgregarSucursalComponent {
  @Input("subSucursales") public subSucursales: any;
  @Input("convenios") public convenios: any;
  @Input("listaDeSeleccionPersona") public listaDeSeleccionPersona: any;
  @Input("idPersona") public idPersona: number;
  @Input("persona") public persona: any;
  @Output("obtenerPrestacion") public obtenerPrestacion = new EventEmitter();

  constructor(private _modalService: NgbModal, private _config: NgbModalConfig) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  open() {
    let existe: boolean = false;
    if (this.listaDeSeleccionPersona.length > 0) {
      for (let i = 0; i < this.listaDeSeleccionPersona.length; i++) {
        if (this.listaDeSeleccionPersona[i].id == this.idPersona) {
          existe = true;
        }
      }
    }
    if (existe) { // si la persona ya fue seleccionada muestra una notificacion
      this.abrirNotificacion();
    }else { // si no existe la personas abro el formulario
      this.abrirModal();
    }

  }
  /**
   * abro el modal con sus instancias
   */
  abrirModal() {
    const modalRef = this._modalService.open(AgregarSucursalContent);
    modalRef.componentInstance.subSucursales = this.subSucursales;
    modalRef.componentInstance.convenios = this.convenios;
    modalRef.result.then(
      (result) => {
        if (result !== false) {
          return this.obtenerPrestacion.emit(result);
        }
      });
  }
  /**
   * notifico al usuario con un mensaje de error
   */
  abrirNotificacion() {
    const notidficacion = this._modalService.open(NotificacionModalContent, { windowClass: 'red-modal' });
  }
}

@Component({
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Notificacion de error</h5>
    </div>
    <div class="modal-body d-flex justify-content-center">
      <span>Esta persona ya ha sido seleccionada</span>
    </div>
    <div class="modal-footer d-flex justify-content-end">
      <button type="button" class="btn btn-danger" (click)="activeModal.close()">Salir</button>
    </div>
  `,
  styleUrls: ['./agregar-sucursal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificacionModalContent {

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
}
