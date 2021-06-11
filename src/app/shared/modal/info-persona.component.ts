import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'content-info-persona',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Información de {{persona.apellido}}, {{persona.nombre}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close(false)">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
       <vista-persona [persona]="persona" [listaBancos]="listadoBancos"></vista-persona>
    </div>
`,
  styleUrls: ['./info-persona.component.scss']
})
export class InfoPersonaContent {
  @Input("persona") public persona: any;
  @Input("listadoBancos") public listadoBancos: any;

  constructor(public activeModal: NgbActiveModal) {}

  cerrarModal(cerrar:boolean) {
    this.activeModal.close(false);
  }
}

@Component({
  selector: 'modal-info-persona',
  templateUrl: './info-persona.component.html',
  styleUrls: ['./info-persona.component.scss']
})
export class InfoPersonaComponent {
  @Input("persona") public persona: any;
  @Input("listadoBancos") public listadoBancos: any;

  constructor(private _modalService: NgbModal, private _config: NgbModalConfig) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  open() {
    const modalRef = this._modalService.open(InfoPersonaContent, { size: 'lg' });
    modalRef.componentInstance.persona = this.persona;
    modalRef.componentInstance.listadoBancos = this.listadoBancos;
  }

}
