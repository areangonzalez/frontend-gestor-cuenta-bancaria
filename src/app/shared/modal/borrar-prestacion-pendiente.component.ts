import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'content-borrar-prestacion-pendiente',
  template: `
  <div class="modal-header">
    <h5 class="modal-title">Confirmación</h5>
  </div>
  <div class="modal-body d-flex justify-content-center">
    <span>¿Esta seguro que desea rechazar la solicitud de CBU?</span>
  </div>
  <div class="modal-footer d-flex justify-content-end">
    <button type="button" class="btn btn-danger" (click)="confirmacion(false)">No</button>
    <button type="button" class="btn btn-success" (click)="confirmacion(true)">Si</button>
  </div>
`,
  styleUrls: ['./borrar-prestacion-pendiente.component.scss']
})
export class BorrarPrestacionPendienteContent {
  constructor(private _activeModal: NgbActiveModal) { }

  confirmacion(respuesta: boolean) {
    this._activeModal.close(respuesta);
  }
}

@Component({
  selector: 'modal-rechazar-prestacion',
  templateUrl: './borrar-prestacion-pendiente.component.html',
  styleUrls: ['./borrar-prestacion-pendiente.component.scss']
})

export class BorrarPrestacionPendienteComponent {
  @Output("confirmarBorrado") public confirmarBorrado = new EventEmitter();

  constructor(private _modalService: NgbModal, private _config: NgbModalConfig) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  open() {
    const modalRef = this._modalService.open(BorrarPrestacionPendienteContent);
    modalRef.result.then(
      (result) => {
          return this.confirmarBorrado.emit(result);
      });
  }
}
