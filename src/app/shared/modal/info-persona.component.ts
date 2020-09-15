import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'content-info-persona',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Información de {{persona.apellido}}, {{persona.nombre}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
       <vista-persona [persona]="persona"></vista-persona>
    </div>
`,
  styleUrls: ['./info-persona.component.scss']
})
export class InfoPersonaContent {
  @Input("persona") public persona: any;

  constructor(public activeModal: NgbActiveModal) {}

  cerrarModal(cerrar:boolean) {
    this.activeModal.close("cancelar registro");
  }
}

@Component({
  selector: 'modal-info-persona',
  templateUrl: './info-persona.component.html',
  styleUrls: ['./info-persona.component.scss']
})
export class InfoPersonaComponent {
  @Input("persona") public persona: any;

  constructor(private _modalService: NgbModal) {}

  open() {
    const modalRef = this._modalService.open(InfoPersonaContent, { size: 'lg' });
    modalRef.componentInstance.persona = this.persona;
  }

}
