import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'content-crear-persona',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Registrar Persona</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <shared-registrar-persona (cancelarForm)="cerrarModal($event)"></shared-registrar-persona>
    </div>
`,
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaContent {

  constructor(public activeModal: NgbActiveModal) {}

  cerrarModal(cerrar:boolean) {
    this.activeModal.close("cancelar registro")
  }

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
