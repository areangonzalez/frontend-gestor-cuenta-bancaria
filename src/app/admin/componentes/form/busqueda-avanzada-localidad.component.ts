import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificacionService, UtilService, DepartamentoService } from 'src/app/core/services';

@Component({
  selector: 'app-busqueda-avanzada-localidad',
  templateUrl: './busqueda-avanzada-localidad.component.html',
  styleUrls: ['./busqueda-avanzada-localidad.component.scss']
})
export class BusquedaAvanzadaLocalidadComponent implements OnInit {
  @Input("provincias") public provincias: any;
  @Output("obtenerBusqueda") public obtenerBusqueda: any;
  public btnSeleccion: boolean = false;
  public mostrar: boolean = false;
  public busquedaAvanzada: FormGroup;
  public departamentos: any = [];

  constructor(private _fb: FormBuilder, private _mensajeService: NotificacionService, private _util: UtilService, private _departamentoService: DepartamentoService, private _msj: NotificacionService) {
    this.busquedaAvanzada = _fb.group({
      global_param: '',
      provinciaid: '',
      departamentoid: ''
    });
  }

  ngOnInit(): void {
  }
  /**
   * funcion que emite la devolucion de parametros al componente padre
   */
   public buscar() {
    // busqueda avanzada de los valores del formulario
    let busquedaAvanzada = this.busquedaAvanzada.value;
    let apiBusqueda:any = {};
    let esTrue: boolean = false;
    // busco dentro del objeto segun la clave
    for (const clave in busquedaAvanzada) {
      Object.assign(apiBusqueda, {[clave]: busquedaAvanzada[clave]});
      esTrue = true;
    }
    this.obtenerBusqueda.emit(apiBusqueda);
    this.btnSeleccion = esTrue;
    this.mostrar = esTrue;
  }
  /**
   * limpiador de los campos del formulario
   */
  public limpiarCampos(){
    let busqueda: any = this.busquedaAvanzada.value;
    for (const key in busqueda) {
        busqueda[key] = '';
    }
    this.busquedaAvanzada.patchValue(busqueda);
    this.buscar();
  }
  /**
   * muestra el fomulario de busqueda avanzada
   */
  public mostrarBusquedaAvanzada(){
    return this.mostrar = !this.mostrar;
  }
  /**
   * marca el campo que ha sido seleccionado
   * @param valor [any]
   * @return [boolean]
   */
  marcarCampo(valor: any){
    let marcar:boolean = false;
    marcar = (valor != null && valor != '') ? true : false;
    return marcar;
  }
  /**
   * Se busca el listado de los departamentos que estan dentro de una provincia
   * @param valor numero de id de provincia
   */
  public departamentoPorProvincia(valor: any) {
    if (valor != "") {
      let provinciaid = parseInt(valor);
      this._departamentoService.buscarPorProvinciaId(provinciaid).subscribe(
        respuesta => {
          this.departamentos = respuesta;
        }, error => { this._msj.cancelado(error); }
      );
    }else{
      this.departamentos = [];
    }
  }
}
