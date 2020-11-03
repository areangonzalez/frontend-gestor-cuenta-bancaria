import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ArchivoService } from 'src/app/core/services/archivo.service';

@Component({
  selector: 'content-importar-archivo',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Importar Archivo</h4>
      <button type="button" class="close" aria-label="Close" (click)="cerrarModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="col-md-12">
        <div class="custom-file">
          <input  (change)="fileChange($event)"  type="file"  class="form-control-file" >
        </div>
      </div>
    </div>
    <div class="modal-footer d-flex justify-content-between">
      <button type="button" class="btn btn-outline-danger" (click)="cerrarModal()"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" class="btn btn-outline-success btn-md" (click)="agregarAdjunto()" id="btn-agregar-adjunto">Importar archivo</button>
    </div>
`,
})
export class ImportarArchivoContent {
  public uploadedFiles: Array < File > ;
  public tipoAdjuntoSeleccionado: any;
  public publicaEnWeb: any = false;
  private _unsubscribeAll: Subject<any>;
  public listaAdjuntos: any;

  constructor(public activeModal: NgbActiveModal, private _archivo: ArchivoService) {}

  cerrarModal() {
    this.activeModal.close(false);
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }


  agregarAdjunto() {
    const fdata = new FormData();
    if (!this.uploadedFiles || !this.tipoAdjuntoSeleccionado) {
      return;
    }
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      fdata.append('adjuntos', this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    fdata.append('tipo', JSON.stringify(this.tipoAdjuntoSeleccionado));
    fdata.append('publicaEnWeb', JSON.stringify(this.publicaEnWeb));

    this._archivo.importarCuentaBps(fdata).subscribe(
      respuesta => {
        this.activeModal.close(respuesta);
      }, error => { this.activeModal.close(error); }
    );
  }
}

@Component({
  selector: 'modal-importar-archivo',
  templateUrl: './importar-archivo.component.html',
  styleUrls: ['./importar-archivo.component.scss']
})
export class ImportarArchivoComponent {
  @Output("obtenerRespuesta") public obtenerRespuesta = new EventEmitter();

  constructor(private _modalService: NgbModal) { }

  open() {
    const modalRef = this._modalService.open(ImportarArchivoContent);
    modalRef.result.then(
      (result) => {
        if (result !== false) {
          console.log(result);
          return this.obtenerRespuesta.emit(result);
        }
      });
  }
}
