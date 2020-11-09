import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Confirmación</h5>
    </div>
    <div class="modal-body d-flex justify-content-center">
      <span>¿Esta seguro que desea descargar?</span>
    </div>
    <div class="modal-footer d-flex justify-content-end">
      <button type="button" class="btn btn-danger" (click)="activeModal.close(false)">No</button>
      <button type="button" class="btn btn-success" (click)="activeModal.close(true)">Si</button>
    </div>
  `,
  styleUrls: ['./confirmar-exportacion.component.scss']
})
export class ConfirmarExportacionModalContent {

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

}

@Component({
  selector: 'modal-confirmar-exportacion',
  templateUrl: './confirmar-exportacion.component.html',
  styleUrls: ['./confirmar-exportacion.component.scss']
})
export class ConfirmarExportacionComponent {
  @Input("listaPersona") public listaPersona: any;
  @Input("TituloBtn") public tituloBtn: string;
  @Output("confirmar") public confirmar = new EventEmitter();


  constructor(private _modalService: NgbModal) { }

  open() {
    const modalRef = this._modalService.open(ConfirmarExportacionModalContent);
    modalRef.result.then(
      (result) => {
          return this.confirmar.emit(result);
      });
  }
}

