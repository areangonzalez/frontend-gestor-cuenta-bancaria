import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificacionService } from 'src/app/core/services';

@Component({
  selector: 'admin-registrar-localidad-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{titulo}} Localidad</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <!-- <div class="row" [formGroup]="localidadForm">
        <div class="form-group col-md-12">
          <label for="provinciaid" class="prioridad">Provincia:</label>
          <select class="form-control" id="provinciaid" formControlName="provinciaid">
            <option value="">Seleccione una Provincia</option>
            <option *ngFor="let prov of provincias" value="{{prov.id}}">{{prov.name}}</option>
          </select>
        </div>
        <div class="form-group col-md-12">
          <label for="departamentoid" class="prioridad">Departamento (<span>*</span>):</label>
          <select class="form-control" id="departamentoid" formControlName="departamentoid">
            <option value="">Seleccione un Departamento</option>
            <option *ngFor="let depto of departamentos" value="{{depto.id}}">{{depto.nombre}}</option>
          </select>
          <div *ngIf="(localidadForm.get('departamentoid').invalid && submitted)" class="text-danger">
              <div *ngIf="localidadForm.get('departamentoid').hasError('required')">Este campo es requerido. </div>
          </div>
        </div>
        <div class="form-group col-md-12">
          <label for="localidadid" class="prioridad">Provincia (<span>*</span>):</label>
          <select class="form-control" id="localidadid" formControlName="localidadid">
            <option value="">Seleccione un Rol</option>
            <option *ngFor="let prov of provincia" value="{{prov.nombre}}">{{prov.name}}</option>
          </select>
          <div *ngIf="(localidadForm.get('localidadid').invalid && submitted)" class="text-danger">
              <div *ngIf="localidadForm.get('localidadid').hasError('required')">Este campo es requerido. </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class=modal-footer>
    <button type="button" class="btn btn-danger" (click)="cerrarModal()"><span class="oi oi-ban" title="Cancelar" aria-hidden="true"></span> Cancelar</button>
    <button type="button" class="btn btn-success" (click)="confirmar()"><i class="fas fa-save-o"></i> Guardar</button>
    </div>
  `,
  styleUrls: ['./registrar-localidad.component.scss']
})
export class RegistrarLocalidadContent {
  @Input("localidad") public localidad?: any;
  @Input("titulo") public titulo: string;
  /* public localidadForm: FormGroup;
  public submitted: boolean = false; */

  constructor(public _activeModal: NgbActiveModal, /* private _fb: FormBuilder */) {
    /* this.localidadForm = _fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      codigo_postal: ['', [Validators.required]],
      departamentoid: ['', [Validators.required]],
      provinciaid: ''
    }); */
  }

  public cerrarModal() {
    this._activeModal.close('closed');
  }

  public confirmar() {
    console.log('confirmo');
  }
}

@Component({
  selector: 'admin-registrar-localidad-modal',
  templateUrl: './registrar-localidad.component.html',
  styleUrls: ['./registrar-localidad.component.scss']
})
export class RegistrarLocalidadComponent {
  @Input("localidad") public localidad?: any;
  @Input("titulo") public titulo: string;

  constructor(private _modalService: NgbModal, private _msj: NotificacionService, private _config: NgbModalConfig)
  {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  abrirModal() {
    const modalRef = this._modalService.open(RegistrarLocalidadContent);
    modalRef.componentInstance.localidad = this.localidad;
    modalRef.componentInstance.titulo = this.titulo;
  }

}
