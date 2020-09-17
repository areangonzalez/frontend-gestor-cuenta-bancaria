import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'content-editar-persona',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Registrar Persona</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <shared-registrar-persona [persona]="persona" (cancelarForm)="cerrarModal($event)"></shared-registrar-persona>
    </div>
`,
  styleUrls: ['./editar-persona.component.scss']
})
export class EditarPersonaContent {
  @Input("persona") public persona: any;

  constructor(public activeModal: NgbActiveModal) {}

  cerrarModal(cerrar:boolean) {
    this.activeModal.close("cancelar registro")
  }

}

@Component({
  selector: 'modal-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.scss']
})
export class EditarPersonaComponent {
  @Input("persona") public persona: any;

  constructor(private _modalService: NgbModal) {}

  open() {
    const modalRef = this._modalService.open(EditarPersonaContent, { size: 'lg' });
    modalRef.componentInstance.persona = this.persona;
  }

}
