import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'modal-importar-archivo',
  templateUrl: './importar-archivo.component.html',
  styleUrls: ['./importar-archivo.component.scss']
})
export class ImportarArchivoComponent implements OnInit {
  public uploadedFiles: Array < File > ;
  public tipoAdjuntoSeleccionado: any;
  public publicaEnWeb: any = false;
  private _unsubscribeAll: Subject<any>;
  public listaAdjuntos: any;

  constructor() { }

  ngOnInit(): void {
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

    /* this.adjuntoService.nuevoAdjunto(fdata, this.idDocumento)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(
      resultado => {
        this.listaAdjuntos = resultado;
        this.cdRef.markForCheck();
        alert('ok');
      },
      error => {
        alert('error');
      }
    ); */


  }

}
