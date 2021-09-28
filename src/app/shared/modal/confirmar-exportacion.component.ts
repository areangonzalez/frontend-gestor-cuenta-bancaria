import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserConvenio } from 'src/app/core/models';
import { AutenticacionService, NotificacionService } from 'src/app/core/services';

@Component({
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Confirmación</h5>
    </div>
    <section *ngIf="(tipoExportacion !== 'historial' && userConvenio.mostrar)">
      <div class="modal-body d-flex justify-content-center">
        <span>Se debe seleccionar un convenio para descargar el archivo</span>
      </div>
      <div class="col">
        <div class="form-group col-md-12" >
          <select class="form-control form-control-sm" id="convenio" [(ngModel)]="tipoConvenioid">
            <option value="">Seleccione un Convenio</option>
            <option *ngFor="let convenio of tipoConvenioLista" value="{{convenio.id}}">{{convenio.nombre}}</option>
          </select>
          <div class="text-danger" *ngIf="(mostrarError)">
              <span>Por favor seleccione un convenio, para exportar.</span>
          </div>
        </div>
      </div>
    </section>
    <div class="modal-body d-flex justify-content-center">
      <span>¿Esta seguro que desea descargar?</span>
    </div>
    <div class="modal-footer d-flex justify-content-end">
      <button type="button" class="btn btn-danger" (click)="this.activeModal.close(false)">No</button>
      <button *ngIf="(tipoExportacion == 'ctaSaldo')" type="button" class="btn btn-success" (click)="confirmar(true)">Si</button>
      <button *ngIf="(tipoExportacion == 'historial')" type="button" class="btn btn-success" (click)="confirmarDescargaHistorial(true)">Si</button>
    </div>
  `,
  styleUrls: ['./confirmar-exportacion.component.scss']
})
export class ConfirmarExportacionModalContent {
  @Input("tipoConvenioLista") public tipoConvenioLista: any;
  @Input("tipoExportacion") public tipoExportacion: string;
  public tipoConvenioid:any = '';
  public mostrarError: boolean = false;
  public userConvenio: UserConvenio;


  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, config: NgbModalConfig, private _user:AutenticacionService, private _msj: NotificacionService) {
    config.backdrop = 'static';
    config.keyboard = false;
    // datos que define si el usuario tiene 1 convenio
    this.userConvenio = _user.getConvenioUser();
  }
  confirmarDescargaHistorial(confirmacion: boolean){
    this.activeModal.close(true);
  }

  confirmar(confirmacion: boolean) {
    if (this.userConvenio.mostrar) {
      if (this.tipoConvenioid === ''){
        return this.mostrarError = true;
      }else if (confirmacion && this.tipoConvenioid != ''){
        this.activeModal.close(this.tipoConvenioid);
      }
    }else if (this.userConvenio.convenio.length == 1) {
      this.activeModal.close(this.userConvenio.convenio[0]["id"]);
    } else {
      this._msj.cancelado("Usted NO tiene permitido realizar esta acción.");
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
  @Input("tipoExportacion") public tipoExportacion: string;
  @Input("tipoConvenioLista") public tipoConvenioLista: any;
  @Output("confirmar") public confirmar = new EventEmitter();


  constructor(private _modalService: NgbModal, private _config: NgbModalConfig) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  open() {
    const modalRef = this._modalService.open(ConfirmarExportacionModalContent);
    modalRef.componentInstance.tipoConvenioLista = this.tipoConvenioLista;
    modalRef.componentInstance.tipoExportacion = this.tipoExportacion;
    modalRef.result.then(
      (result) => {
        if (result != false){
          return this.confirmar.emit(result);
        }
      });
  }
}

