import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArchivoService, NotificacionService, UtilService, AutenticacionService } from 'src/app/core/services';
import { PrestacionService } from 'src/app/core/services/prestacion.service';
import {saveAs as importedSaveAs} from "file-saver";
import { configurarListas, UserConvenio } from 'src/app/core/models';

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
  public tipo_convenio: any = '';
  public userConvenio: UserConvenio;

  constructor(private _msj: NotificacionService, private _util: UtilService, private _descargaService: ArchivoService, private _prestacionService: PrestacionService, private _user: AutenticacionService) {
  }

  ngOnInit(): void {
    this.userConvenio = this._user.getConvenioUser();
  }

  borrarPersona(confirmacion: boolean, index: number, idPrestacion:number) {
    if (confirmacion) {
      if (idPrestacion !== undefined) {
        this._prestacionService.borrar(idPrestacion).subscribe(
          respuesta => {
            this.actualizarListadoPersonas.emit(true);
            this.actualizarListaSeleccion(true);
            this._msj.exitoso("Se ha quitado el pedido de convenio de la persona.");
          },
          error => { this._msj.cancelado(error); });
      }
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

  /**
   * Edito los datos de una persona
   * @param datosPersona datos editados de una persona
   */
  editarPersona(datosPersona: any) {
    this.actualizarListaSeleccion(true);
    this.actualizarListadoPersonas.emit(true);
  }

  actualizarListaSeleccion(actualizar: boolean) {
    if (actualizar) {
      let params = {};
      if (this.userConvenio.convenio.length == 1) {
        params["tipo_convenioid"] = this.userConvenio.convenio[0]["id"];
      }else if (this.tipo_convenio != '') {
        params["tipo_convenioid"] = this.tipo_convenio;
      }

      this._prestacionService.buscar(params).subscribe(
        respuesta => {
          this.configurarListas.seleccionPersona = respuesta;
          this.actualizarListadoPersonas.emit(true);
        }, error => { this._msj.cancelado(error); }
      );
    }
  }

  /**
   * Permite descargar un archivo de texto
   */
  public exportarArchivo(tipoConvenioid:string) {
    if (tipoConvenioid !== ''){
      let params = {"tipo_convenioid": tipoConvenioid};

      this._descargaService.exportarCtaSaldo(params).subscribe(
        respuesta => {
          let blob = new Blob([respuesta["cuenta_saldo"]], {type:"text/plain;charset=utf-8"});
          let hoy = this._util.fechaHoy();

          let filename = 'CTASLDO_'+ hoy +'.txt';
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

  cortarObservacion(texto:any) {

    if (texto) {
      let textoMinimo = texto.substr(0, 10);
      return textoMinimo;
    }
  }

  buscarPorConvenio(tipoConvenioid: any) {
    this._prestacionService.buscar({tipo_convenioid: tipoConvenioid}).subscribe(
      respuesta => {
        this.configurarListas.seleccionPersona = respuesta;
    }, error => { this._msj.cancelado(error); });
  }

}
