import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'content-registrar-cbu',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Registrar Cuenta Bancaria</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close(false)">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <shared-form-cuenta [listaBanco]="listadoBancos" [personaid]="personaid" (obtenerRespuesta)="cerrarModal($event)"></shared-form-cuenta>
    </div>
`,
  styleUrls: ['./registrar-cbu.component.scss']
})
export class RegistrarCbuContent {
  @Input("listadoBancos") public listadoBancos: any; // array que contiene el listado de los bancos
  @Input("personaid") public personaid: number; // array que contiene el listado de los bancos

  constructor(public activeModal: NgbActiveModal) {}

  cerrarModal(valor:boolean) {
    if (valor) {
      this.activeModal.close(false);
    }else {
      this.activeModal.close(false);
    }
  }

}

@Component({
  selector: 'modal-registrar-cbu',
  templateUrl: './registrar-cbu.component.html',
  styleUrls: ['./registrar-cbu.component.scss']
})
export class RegistrarCbuComponent {
  @Input("listadoBancos") public listadoBancos: any; // array que contiene el listado de los bancos
  @Input("personaid") public personaid: number;

  constructor(private _modalService: NgbModal, private _config: NgbModalConfig) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  open() {
    const modalRef = this._modalService.open(RegistrarCbuContent);
    modalRef.componentInstance.listadoBancos = this.listadoBancos;
    modalRef.componentInstance.personaid = this.personaid;
  }

}
