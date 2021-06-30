import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificacionService } from 'src/app/core/services';
import { configurarListas } from '../../../core/models';


@Component({
  selector: 'admin-registrar-localidad-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{titulo}} Localidad</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">

    </div>
    <div class=modal-footer>
    <button type="button" class="btn btn-danger" (click)="cerrarModal()"><span class="oi oi-ban" title="Cancelar" aria-hidden="true"></span> Cancelar</button>
    <button type="button" class="btn btn-success" (click)="confirmar()"><i class="fas fa-save-o"></i> Guardar</button>
    </div>
  `,
  styleUrls: ['./registrar-localidad.component.scss']
})
export class RegistrarLocalidadContent {
  @Input("config-listas") public configurarListas: configurarListas; // array que contiene el/los listados para el componente
  @Input("localidad") public localidad?: any;
  @Input("titulo") public titulo: string;

  constructor(public _activeModal: NgbActiveModal) { }

  public cerrarModal() {
    this._activeModal.close('closed');
  }

  public confirmar() {
    console.log('confirmo');
  }
}

@Component({
  selector: 'admin-registrar-localidad-modal',
  templateUrl: './registrar-localidad.component.html',
  styleUrls: ['./registrar-localidad.component.scss']
})
export class RegistrarLocalidadComponent {
  @Input("config-listas") public configurarListas: configurarListas; // array que contiene el/los listados para el componente
  @Input("localidad") public localidad?: any;
  @Input("titulo") public titulo: string;

  constructor(private _modalService: NgbModal, private _msj: NotificacionService, private _config: NgbModalConfig)
  {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  abrirModal() {
    const modalRef = this._modalService.open(RegistrarLocalidadContent);
    modalRef.componentInstance.configurarListas = this.configurarListas;
    modalRef.componentInstance.localidad = this.localidad;
    modalRef.componentInstance.titulo = this.titulo;
  }

}
