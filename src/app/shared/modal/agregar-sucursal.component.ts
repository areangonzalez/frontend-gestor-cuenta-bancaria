import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      <button type="button" class="btn btn-outline-success" (click)="validarPersona()"><i class="far fa-save"></i> Guardar</button>
    </div>
`,
})
export class AgregarSucursalContent {
  @Input("subSucursales") public subSucursales:any;
  public sucursalForm: FormGroup;
  public submitted: boolean = false;
  public sucursalSeleccionada: any = { codigo_postal: '', codigo: ''};

  constructor(public activeModal: NgbActiveModal, private _fb:FormBuilder) {
    this.sucursalForm = _fb.group({
      sucursal: ['', Validators.required],
    });
  }

  cerrarModal() {
    this.activeModal.close(false);
  }

  validarPersona() {
    this.submitted = true;
    if ( this.sucursalForm.invalid ) {
      return;
    }else{
      this.sucursalSeleccionada.codigo_postal = this.sucursalForm.value.sucursal.codigo_postal;
      this.sucursalSeleccionada.codigo = this.sucursalForm.value.sucursal.codigo;

      this.activeModal.close(this.sucursalSeleccionada);
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
    if (existe) {
      this.abrirNotificacion();
    }else {
      this.abrirModal();
    }

  }

  abrirModal() {
    const modalRef = this._modalService.open(AgregarSucursalContent);
    modalRef.componentInstance.subSucursales = this.subSucursales;
    modalRef.result.then(
      (result) => {
        if (result !== false) {
          return this.seleccionDeSucursal.emit(result);
        }
      });
  }

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
