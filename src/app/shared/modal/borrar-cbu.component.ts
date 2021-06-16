import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Confirmación</h5>
    </div>
    <div class="modal-body d-flex justify-content-center">
      <span>¿Esta seguro que desea borrar la cuenta bancaria?</span>
    </div>
    <div class="modal-footer d-flex justify-content-end">
      <button type="button" class="btn btn-danger" (click)="confirmacion(false)">No</button>
      <button type="button" class="btn btn-success" (click)="confirmacion(true)">Si</button>
    </div>
  `,
  styleUrls: ['./borrar-cbu.component.scss']
})
export class BorrarCbuContent {

  constructor(private _activeModal: NgbActiveModal) { }

  confirmacion(respuesta: boolean) {
    this._activeModal.close(respuesta);
  }
}


@Component({
  selector: 'modal-borrar-cbu',
  templateUrl: './borrar-cbu.component.html',
  styleUrls: ['./borrar-cbu.component.scss']
})
export class BorrarCbuComponent {
  @Output("confirmarBorrado") public confirmarBorrado = new EventEmitter();

  constructor(private _modalService: NgbModal, private _config: NgbModalConfig) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  open() {
    const modalRef = this._modalService.open(BorrarCbuContent);
    modalRef.result.then(
      (result) => {
          return this.confirmarBorrado.emit(result);
      });
  }

}
