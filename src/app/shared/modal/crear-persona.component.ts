import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'content-crear-persona',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <p>Hola</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
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
    const modalRef = this._modalService.open(CrearPersonaContent);
    modalRef.componentInstance.name = 'World';
  }

}
