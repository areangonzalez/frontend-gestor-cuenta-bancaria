import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { configurarListas } from 'src/app/core/models';

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
        <shared-registrar-persona [config-listas]="configurarListas" (cancelarForm)="cerrarModal($event)" (obtenerRespuesta)="guardadoExitoso($event)"></shared-registrar-persona>
    </div>
`,
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaContent {
  @Input("configurarListas") public configurarListas: configurarListas; // array que contiene el/los listados para el componente

  constructor(public activeModal: NgbActiveModal) {}

  cerrarModal(cerrar:boolean) {
    this.activeModal.close(false);
  }

  guardadoExitoso(nroCuil:string) {
    this.activeModal.close(nroCuil);
  }

}


@Component({
  selector: 'modal-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaComponent {
  @Input("config-listas") public configurarListas: configurarListas; // array que contiene el/los listados para el componente
  @Output("cuilPersona") public cuilPersona = new EventEmitter();

  constructor(private _modalService: NgbModal) {}

  open() {
    const modalRef = this._modalService.open(CrearPersonaContent, { size: 'lg' });
    modalRef.componentInstance.configurarListas = this.configurarListas;
    modalRef.result.then(
      (result) => {
        if (result !== false) {
          return this.cuilPersona.emit(result);
        }
      }, (reason) => {/* Cual es la razon de que angular mande un cero */});
  }

}
