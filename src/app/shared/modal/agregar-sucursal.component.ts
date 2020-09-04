import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'content-agregar-sucursal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Registrar Persona</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <fieldset [formGroup]="sucursalForm">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="localidad">Localidad</label>
                <select class="form-control" id="localidad" formControlName="sucursal_codigo_postal">
                  <option value="">Seleccionar localidad</option>
                  <option value="1">Viedma</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="sucursal">Sucursal</label>
                <select class="form-control" id="sucursal" formControlName="sucursal_codigo">
                  <option value="">Seleccionar Sucursal</option>
                  <option value="1">alguna sucursal</option>
                </select>
              </div>
            </div>
          </div>
        </fieldset>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="cancelar()"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" class="btn btn-outline-success" (click)="validarPersona()"><i class="far fa-save"></i> Guardar</button>
    </div>
`,
})
export class AgregarSucursalContent {
  public sucursalForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private _fb:FormBuilder) {
    this.sucursalForm = _fb.group({
      sucursal_codigo_postal: ['', Validators.required],
      sucursal_codigo: ['', Validators.required]
    });
  }

  cerrarModal(cerrar:boolean) {
    this.activeModal.close("cancelar registro")
  }

}

@Component({
  selector: 'modal-agregar-sucursal',
  templateUrl: './agregar-sucursal.component.html',
  styleUrls: ['./agregar-sucursal.component.scss']
})
export class AgregarSucursalComponent {

  constructor(private _modalService: NgbModal) { }

  open() {
    const modalRef = this._modalService.open(AgregarSucursalContent);
  }

}
