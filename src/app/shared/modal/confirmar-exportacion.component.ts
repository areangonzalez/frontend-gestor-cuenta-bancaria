import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Confirmación</h5>
    </div>
    <div class="modal-body d-flex justify-content-center">
      <span>Se debe seleccionar un convenio para descargar el archivo</span>
    </div>
    <div class="col">
      <div class="form-group col-md-12" >
        <select class="form-control form-control-sm" id="convenio" [(ngModel)]="tipoConvenioid">
          <option value="">Seleccione un Convenio</option>
          <option *ngFor="let convenio of tipoConvenioLista" value="{{convenio}}">{{convenio.nombre}}</option>
        </select>
        <div class="text-danger" *ngIf="(mostrarError)">
            <span>Por favor seleccione un convenio, para exportar.</span>
        </div>
      </div>
    </div>
    <div class="modal-body d-flex justify-content-center">
      <span>¿Esta seguro que desea descargar?</span>
    </div>
    <div class="modal-footer d-flex justify-content-end">
      <button type="button" class="btn btn-danger" (click)="confirmar(false)">No</button>
      <button type="button" class="btn btn-success" (click)="confirmar(true)">Si</button>
    </div>
  `,
  styleUrls: ['./confirmar-exportacion.component.scss']
})
export class ConfirmarExportacionModalContent {
  @Input("tipoConvenioLista") public tipoConvenioLista: any;
  public tipoConvenioid:any = '';
  public mostrarError: boolean = false;


  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  confirmar(confirmacion: boolean) {
    if (this.tipoConvenioid === ''){
      return this.mostrarError = true;
    }else if (confirmacion && this.tipoConvenioid != ''){
      this.activeModal.close({confirmar: true, tipo_convenioid: this.tipoConvenioid});
    }else{
      this.activeModal.close(false);
    }
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
  @Input("tipoBoton") public tipoBoton: string;
  @Input("tipoConvenioLista") public tipoConvenioLista: any;
  @Output("confirmar") public confirmar = new EventEmitter();


  constructor(private _modalService: NgbModal, private _config: NgbModalConfig) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  open() {
    const modalRef = this._modalService.open(ConfirmarExportacionModalContent);
    modalRef.componentInstance.tipoConvenioLista = this.tipoConvenioLista;
    modalRef.result.then(
      (result) => {
          return this.confirmar.emit(result);
      });
  }
}

