import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalConfig, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/core/services';

@Component({
  selector: 'content-agregar-sucursal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Registrar Persona</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <fieldset [formGroup]="sucursalForm">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="fecha_nacimiento">Fecha Nacimiento:</label>
                <div class="input-group">
                  <input class="form-control" #c1 placeholder="Ej.: dd/mm/yyyy" ngbDatepicker #fpd="ngbDatepicker"
                  id="fecha_nacimiento" formControlName="fechaIngreso" (ngModelChange)="formatFecha($event)" [ngClass]="{'is-invalid': (sucursalForm.get('fechaIngreso').invalid && submitted)}" >
                  <div class="input-group-append">
                      <button class="btn btn-outline-info" (click)="fpd.toggle()" type="button" [ngClass]="{'btn-outline-danger': (sucursalForm.get('fechaIngreso').invalid && submitted), 'is-invalid': (sucursalForm.get('fechaIngreso').invalid && submitted)}"> <!--  -->
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
                <label for="monto">Monto</label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">$</div>
                  </div>
                  <input type="text" id="monto" placeholder="Ej.: 1000" class="form-control" formControlName="monto" (keyup)="validarMoneda($event.target)">
                </div>
              </div>
              <div *ngIf="(sucursalForm.get('monto').invalid && submitted)" class="text-danger">
                  <span>Por favor ingrese un monto.</span>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label for="sucursal">Sucursal</label>
                <select class="form-control" id="sucursal" formControlName="sucursal">
                  <option value="">Seleccionar Sucursal</option>
                  <option *ngFor="let sucursal of subSucursales" [ngValue]="sucursal">{{sucursal.sucursal_codigo}} - {{sucursal.nombre}}</option>
                </select>
              </div>
              <div *ngIf="(sucursalForm.get('sucursal').invalid && submitted)" class="text-danger">
                  <span>Por favor seleccione una sucursal.</span>
              </div>
            </div>
          </div>
        </fieldset>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="cerrarModal()"><i class="fas fa-ban"></i> Cancelar</button>
      <button *ngIf="copiaSeleccion.existe" type="button" class="btn btn-outline-dark" (click)="pegarDatosForm(copiaSeleccion)"><i class="fas fa-paste"></i> Pegar datos </button>
      <button type="button" class="btn btn-outline-success" (click)="validarPersona()"><i class="far fa-save"></i> Guardar</button>
    </div>
`,
})
export class AgregarSucursalContent {
  @Input("subSucursales") public subSucursales:any;
  @Input("copiaSeleccion") public copiaSeleccion: any;
  public sucursalForm: FormGroup;
  public submitted: boolean = false;
  public sucursalSeleccionada: any = { codigo_postal: '', codigo: '', monto: '', fechaIngreso: '', fecha_ingreso: ''};

  constructor(public activeModal: NgbActiveModal, private _fb:FormBuilder, private _util: UtilService, private _configNgbDate: NgbDatepickerConfig) {
    this.sucursalForm = _fb.group({
      sucursal: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      fecha_ingreso: '',
      fechaIngreso: ['', [Validators.required]]
    });

    _configNgbDate.minDate = {year: 1900, month: 1, day: 1};
  }
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
      this.sucursalSeleccionada.codigo_postal = this.sucursalForm.value.sucursal.codigo_postal;
      this.sucursalSeleccionada.codigo = this.sucursalForm.value.sucursal.codigo;
      this.sucursalSeleccionada.monto = this.sucursalForm.value.monto;
      this.sucursalSeleccionada.fecha_ingreso = this.sucursalForm.value.fecha_ingreso;
      this.sucursalSeleccionada.fechaIngreso = this.sucursalForm.value.fechaIngreso;

      this.activeModal.close(this.sucursalSeleccionada);
    }
  }
  /**
   * pego los datos copiados dentro del formulario
   * @param copia objeto que contiene la copia de datos
   */
  pegarDatosForm(copia:any) {
    let sucursal: any = {};
    // busco en el listado de subsucursales, la sucursal quecontenga el mismo codigo
    for (let i = 0; i < this.subSucursales.length; i++) {
      if (this.subSucursales[i].codigo === copia.codigo){
        sucursal = this.subSucursales[i];
      }
    }
    // seteo el formulario
    this.sucursalForm.patchValue({sucursal: sucursal, monto: copia.monto, fechaIngreso: copia.fechaIngreso, fecha_ingreso: copia.fecha_ingreso });
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
  @Input("listaDeSeleccionPersona") public listaDeSeleccionPersona: any;
  @Input("idPersona") public idPersona: number;
  @Input("existeCopia") public existeCopia: boolean;
  @Input("copiaSeleccion") public copiaSeleccion: any;
  @Output("seleccionDeSucursal") public seleccionDeSucursal = new EventEmitter();

  constructor(private _modalService: NgbModal) { }

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
    modalRef.componentInstance.copiaSeleccion = this.copiaSeleccion;
    modalRef.result.then(
      (result) => {
        if (result !== false) {
          return this.seleccionDeSucursal.emit(result);
        }
      });
  }
  /**
   * notifico al usuario con un mensaje de error
   */
  abrirNotificacion() {
    const notidficacion = this._modalService.open(NotidicacionModalContent, { windowClass: 'red-modal' });
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
export class NotidicacionModalContent {

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
}
