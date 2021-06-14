import { Component, Input, Output, EventEmitter } from '@angular/core';
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
      <shared-form-cuenta [listaBanco]="listadoBancos" [personaid]="personaid" [datosCuenta]="datosCuenta" (obtenerRespuesta)="cerrarModal($event)"></shared-form-cuenta>
    </div>
`,
  styleUrls: ['./registrar-cbu.component.scss']
})
export class RegistrarCbuContent {
  @Input("listadoBancos") public listadoBancos: any; // array que contiene el listado de los bancos
  @Input("personaid") public personaid: number; // array que contiene el listado de los bancos
  @Input("datosCuenta") public datosCuenta: any; // objeto que contiene los datos de cuenta bancaria

  constructor(public activeModal: NgbActiveModal) {}

  cerrarModal(valor:boolean) {
      this.activeModal.close(valor);
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
  @Input("botonCircular") public botonCircular: boolean;
  @Input("datosCuenta") public datosCuenta: any; // objeto que contiene los datos de cuenta bancaria
  @Output("actualizarDatos") public actualizarDatos = new EventEmitter();

  constructor(private _modalService: NgbModal, private _config: NgbModalConfig) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  open() {
    const modalRef = this._modalService.open(RegistrarCbuContent);
    modalRef.componentInstance.listadoBancos = this.listadoBancos;
    modalRef.componentInstance.personaid = this.personaid;
    modalRef.componentInstance.datosCuenta = this.datosCuenta;
    modalRef.result.then(
      (result) => {
        return this.actualizarDatos.emit(result);
      });
  }

}
