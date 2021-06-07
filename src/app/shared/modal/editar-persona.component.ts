import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { configurarListas } from 'src/app/core/models';
import { NotificacionService, PersonaService } from 'src/app/core/services';

@Component({
  selector: 'content-editar-persona',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Editar Persona</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close(false)">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <shared-registrar-persona [persona]="persona" [config-listas]="configurarListas" (cancelarForm)="cerrarModal($event)" (obtenerRespuesta)="guardadoExitoso($event)"></shared-registrar-persona>
    </div>

`,
  styleUrls: ['./editar-persona.component.scss']
})
export class EditarPersonaContent {
  @Input("persona") public persona: any; // objeto que contiene los datos de persona
  @Input("configurarListas") public configurarListas: any; // array que contiene el/los listados para el componente

  constructor(public activeModal: NgbActiveModal) {}

  cerrarModal(cerrar:boolean) {
    this.activeModal.close(false);
  }

  guardadoExitoso(persona: any) {
    this.activeModal.close(persona);
  }

}

@Component({
  selector: 'modal-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.scss']
})
export class EditarPersonaComponent {
  @Input("tipo") public tipo:string;
  @Input("persona") public persona: any; // objeto que contiene los datos de persona
  @Input("config-listas") public configurarListas: configurarListas; // array que contiene el/los listados para el componente
  @Output("obtenerDatosPersona") public obtenerDatosPersona = new EventEmitter();

  constructor(private _modalService: NgbModal, private _personaService: PersonaService, private _msj: NotificacionService, private _config: NgbModalConfig) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  buscarPersonaPorId() {
    if (this.persona.personaid) {
      this._personaService.buscarPorId(this.persona.personaid).subscribe(
        respuesta => {
          this.abrirModal(respuesta);
        }, error => { this._msj.cancelado(error); })
    } else {
      this._personaService.buscarPorId(this.persona.id).subscribe(
        respuesta => {
          this.abrirModal(respuesta);
        }, error => { this._msj.cancelado(error); })
    }
  }

  abrirModal(persona: any) {
    const modalRef = this._modalService.open(EditarPersonaContent, { size: 'lg' });
    modalRef.componentInstance.persona = persona;
    modalRef.componentInstance.configurarListas = this.configurarListas;
    modalRef.result.then(
      (result) => {
        if (result !== false) {
          this._personaService.buscarPorId(result.id).subscribe(
            respuesta => {
              return this.obtenerDatosPersona.emit(respuesta);
            }, error => { this._msj.cancelado(error); }
          )
        }
      });
  }

}
