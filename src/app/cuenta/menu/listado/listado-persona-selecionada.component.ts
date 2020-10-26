import { Component, OnInit, Input } from '@angular/core';
import { CuentaSaldoService, NotificacionService } from 'src/app/core/services';

@Component({
  selector: 'cuenta-listado-persona-selecionada',
  templateUrl: './listado-persona-selecionada.component.html',
  styleUrls: ['./listado-persona-selecionada.component.scss']
})
export class ListadoPersonaSelecionadaComponent implements OnInit {
  @Input("personaSeleccionada") public personaSeleccionada: any;
  @Input("tipo") public tipo: string;

  constructor(private _msj: NotificacionService, private _cuentaSaldoService: CuentaSaldoService) { }

  ngOnInit(): void {
  }

  borrarPersona(index: number) {
    this.personaSeleccionada.splice(index, 1);
  }

  public direccion(lugar: object){
    let dir = "";
    dir += lugar['localidad'];
    dir += (lugar['barrio'] != '') ? " - " + lugar['barrio'] + ' - ' + lugar['calle'] + ' ' + lugar['altura']: ' - ' + lugar['calle'] + ' ' + lugar['altura'];
    dir += (lugar['escalera'] != '') ? ' - ' + lugar['escalera'] : '';
    dir += (lugar['piso'] != '') ? ' - ' + lugar['piso'] : '';
    dir += (lugar['depto'] != '') ? ' - ' + lugar['depto'] : '';

    return dir;
  }

  public guardarListadoSeleccion(seleccion: any) {
    if (seleccion.length > 0) {
      // guardo el listado de las personas seleccionadas
      this._cuentaSaldoService.guardarSeleccionPersona(seleccion).subscribe(
        respuesta => {
          this._msj.exitoso("El listado se ha guardado con exito!!");
        }, error => { this._msj.cancelado("Fallo al guardar el listado"); }
      );
    }else{
      this._msj.cancelado("No hay personas seleccionadas dentro del listado.");
    }
  }



  /**
   * Permite descargar un archivo de texto
   */
  public exportarArchivo(exportar:boolean) {
    console.log("se hizo click!");
    /* if (exportar){
      this._descargasService.descargar(this.personaSeleccionada).subscribe(
        blob => {
          let filename = 'cuenta_salto.txt';
          importedSaveAs(blob, filename);
      }, error => { this._mensajeService.cancelado(error, [{name: ''}]); });
    } */
  }
}
