import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificacionService } from 'src/app/core/services';


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
      <admin-localidad-form [localidad]="localidad" [provincias]="provincias" (cancelarForm)="confirmar($event)"></admin-localidad-form>
    </div>
  `,
  styleUrls: ['./registrar-localidad.component.scss']
})
export class RegistrarLocalidadContent {
  @Input("provincias") public provincias: any; // array que contiene el/los listados para el componente
  @Input("localidad") public localidad?: any;
  @Input("titulo") public titulo: string;

  constructor(public _activeModal: NgbActiveModal) { }

  public cerrarModal() {
    this._activeModal.close('closed');
  }

  public confirmar(confirmacion: boolean) {
    if (confirmacion) {
      this._activeModal.close('close');
    }else {
      this._activeModal.close('close');
    }
  }
}

@Component({
  selector: 'admin-registrar-localidad-modal',
  templateUrl: './registrar-localidad.component.html',
  styleUrls: ['./registrar-localidad.component.scss']
})
export class RegistrarLocalidadComponent {
  @Input("provincias") public provincias: any; // array que contiene el/los listados para el componente
  @Input("localidad") public localidad?: any;
  @Input("titulo") public titulo: string;

  constructor(private _modalService: NgbModal, private _msj: NotificacionService, private _config: NgbModalConfig)
  {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  abrirModal() {
    const modalRef = this._modalService.open(RegistrarLocalidadContent);
    modalRef.componentInstance.provincias = this.provincias;
    modalRef.componentInstance.localidad = this.localidad;
    modalRef.componentInstance.titulo = this.titulo;
  }

}
