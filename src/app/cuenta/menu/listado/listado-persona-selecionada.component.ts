import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArchivoService, CuentaSaldoService, NotificacionService, PrestacionService } from 'src/app/core/services';
import {saveAs as importedSaveAs} from "file-saver";
import { configurarListas } from 'src/app/core/models';

@Component({
  selector: 'cuenta-listado-persona-selecionada',
  templateUrl: './listado-persona-selecionada.component.html',
  styleUrls: ['./listado-persona-selecionada.component.scss']
})
export class ListadoPersonaSelecionadaComponent implements OnInit {
  @Input("config-listas") public configurarListas: configurarListas; // array que contiene el/los listados para el componente
  /* @Input("personaSeleccionada") public personaSeleccionada: any; */
  @Input("tipo") public tipo: string;
  @Output("actualizarListadoPersonas") public actualizarListadoPersonas = new EventEmitter();

  constructor(private _msj: NotificacionService, private _cuentaSaldoService: CuentaSaldoService, private _descargaService: ArchivoService, private _prestacionService: PrestacionService) { }

  ngOnInit(): void {
  }

  borrarPersona(confirmacion: boolean, index: number, idPrestacion:number) {
    if (confirmacion) {
      if (idPrestacion !== undefined) {
        this._prestacionService.borrar(idPrestacion).subscribe(
          respuesta => {
            this._msj.exitoso("Se ha quitado el pedido de convenio de la persona.");
          },
          error => { this._msj.cancelado(error); });
      }
      this.configurarListas.seleccionPersona.splice(index, 1);
    }

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
          this.actualizarListaSeleccion(true);
          this._msj.exitoso("El listado se ha guardado con exito!!");
        }, error => { this.tipoError(error); }
      );
    }else{
      this._msj.cancelado("No hay personas seleccionadas dentro del listado.");
    }
  }
  /**
   * Edito los datos de una persona
   * @param datosPersona datos editados de una persona
   */
  editarPersona(datosPersona: any) {
    // busco la persona en listaod y agrego los cambios a la persona encontrada
    for (let i = 0; i < this.configurarListas.seleccionPersona.length; i++) {
      if (this.configurarListas.seleccionPersona[i].id == datosPersona.id) {
        Object.assign(datosPersona, { prestacion: this.configurarListas.seleccionPersona[i].prestacion, tiene_cbu: this.configurarListas.seleccionPersona[i].tiene_cbu });
        this.configurarListas.seleccionPersona[i] = datosPersona;
        this.actualizarListadoPersonas.emit(true);
      }
    }
  }

  actualizarListaSeleccion(actualizar: boolean) {
    if (actualizar) {
      this._cuentaSaldoService.listado().subscribe(
        respuesta => {
          this.configurarListas.seleccionPersona = respuesta;
        }, error => { this._msj.cancelado(error); }
      );
    }
  }

  /**
   * Permite descargar un archivo de texto
   */
  public exportarArchivo(exportar:boolean) {
    if (exportar){
      this._descargaService.exportarCtaSaldo(this.configurarListas.seleccionPersona).subscribe(
        respuesta => {
          let blob = new Blob([respuesta["cuenta_saldo"]], {type:"text/plain;charset=utf-8"});

          let filename = 'CTASLDO.txt';
          importedSaveAs(blob, filename);
          this.configurarListas.seleccionPersona = [];

          setTimeout(() => {
            this._msj.exitoso(respuesta["message"]);
            this.actualizarListaSeleccion(true);
          }, 800);
      }, error => {
        this.actualizarListaSeleccion(false);

        /* let msjObject = JSON.parse(error); */
        this.tipoError(error);
      });
    }
  }

  private tipoError(error: any) {
    if (typeof error === 'string') {
      this._msj.cancelado(error);
    }else{
      this._msj.erroresMultiples(error);
    }
  }

}
