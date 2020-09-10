import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  @Output("seleccionDeSucursal") public seleccionDeSucursal = new EventEmitter();

  constructor(private _modalService: NgbModal) { }

  open() {
    const modalRef = this._modalService.open(AgregarSucursalContent);
    modalRef.componentInstance.subSucursales = this.subSucursales;
    modalRef.result.then(
      (result) => {
        if (result !== false) {
          return this.seleccionDeSucursal.emit(result);
        }
      });
  }

}
