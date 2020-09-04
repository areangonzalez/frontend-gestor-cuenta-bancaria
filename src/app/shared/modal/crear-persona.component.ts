import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'content-crear-persona',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Registrar persona</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <shared-registrar-persona></shared-registrar-persona>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="activeModal.close('Close click')"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" class="btn btn-outline-success" (click)="activeModal.close('Close click')"><i class="far fa-save"></i> Guardar</button>
    </div>
`,
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaContent {

  constructor(public activeModal: NgbActiveModal) {}

}


@Component({
  selector: 'modal-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaComponent {

  constructor(private _modalService: NgbModal) {}

  open() {
    const modalRef = this._modalService.open(CrearPersonaContent, { size: 'lg' });
    modalRef.componentInstance.name = 'World';
  }

}
