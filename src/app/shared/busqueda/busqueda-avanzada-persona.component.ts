import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilService } from '../../core/services';
import { configurarListas } from 'src/app/core/models';

@Component({
  selector: 'busqueda-avanzada-persona',
  templateUrl: './busqueda-avanzada-persona.component.html',
  styleUrls: ['./busqueda-avanzada-persona.component.scss']
})
export class BusquedaAvanzadaPersonaComponent implements OnInit {
  @Input("tipo") public tipo:string;
  @Input("config-listas") public configurarListas: configurarListas; // array que contiene el/los listados para el componente
  @Output("obtenerBusqueda") public obtenerBusqueda = new EventEmitter();
  @Output("limpiar") public limpiar = new EventEmitter();
  public global_param:string = '';
  public busquedaAvanzada: FormGroup;
  public mostrar: boolean = false;
  public btnSeleccion: boolean = false;

  // Variables para calendarios
  public hoveredDate: NgbDate | null = null; // Resalta la fecha
  public fromDate: NgbDate | null = null; // fecha desde
  public toDate: NgbDate | null = null; // fecha hasta
  public mostrarDp: boolean = false; // Muestra el DatePicker

  constructor( private _util: UtilService , private _fb: FormBuilder) {
    this.busquedaAvanzada = _fb.group({
      fechaDesde: '',
      fecha_desde: '',
      fechaHasta: '',
      fecha_hasta: '',
      localidadid: ''
    });
  }

  ngOnInit(): void {
  }
  /**
   * arma el listado de parametros a buscar para la api.
   */
  public buscar(){
    let busquedaAvanzada = this.busquedaAvanzada.value;
    let apiBusqueda:any = {};
    let esTrue: boolean = false;

    if (this.global_param !== '') {
      Object.assign(apiBusqueda, {"global_param": this.global_param});
    }
    for (const clave in busquedaAvanzada) {
      if (clave != 'fechaDesde' && clave != 'fechaHasta'){
        if(busquedaAvanzada[clave] !== '' && busquedaAvanzada[clave] !== null && (busquedaAvanzada[clave])){
          Object.assign(apiBusqueda, {[clave]: busquedaAvanzada[clave]});
          esTrue = true;
        }
      }
    }
    this.btnSeleccion = esTrue;
    this.obtenerBusqueda.emit(apiBusqueda);
  }
  /**
   * limpia los campos del formulario de búsqueda avanzada
   * y los parametros de busqueda para el api
   */
  public limpiarCampos() {
    let busqueda: any = this.busquedaAvanzada.value;
      for (const key in busqueda) {
        if (key == 'fechaDesde') {
          busqueda[key] = null;
        }else if (key == 'fechaHasta') {
          busqueda[key] = null;
        }else {
          busqueda[key] = '';
        }
      }
      this.global_param = '';
      this.busquedaAvanzada.patchValue(busqueda);
      this.btnSeleccion = false;
      this.mostrar = false;
      this.limpiar.emit(true);
  }
  /**
   * Muestra/Oculta los campos de busqueda avanzada
   */
  public mostrarBusquedaAvanzada(){
    return this.mostrar = !this.mostrar;
  }
  /**
   * Formatea la fecha para una variable del formulario
   * @param obj [any] objecto de fecha
   * @param keyFecha [string] nombre de la variable que sera seteada
   */
  public formatFecha(obj:any, keyFecha:string){
    if (obj != null){
      this.busquedaAvanzada.controls[keyFecha].patchValue(this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd"));
    }else{
      this.busquedaAvanzada.controls[keyFecha].patchValue('');
    }
  }
  /**
   * Marca los campos que seran utilizados en la busqueda avanzada
   * @param valor contiene el valor del input seleccionado
   */
  marcarCampo(valor: any){
    let marcar:boolean = false;
    marcar = (valor != null && valor != '') ? true : false;
    return marcar;
  }

  /* ### DATE PICKER CONFIG ### */
  /**
   * Selecciona el rango de fecha DESDE/HASTA
   * @param date [NgbDate] objeto de fecha del DatePicker
   */
  public onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      console.log(date);
      this.busquedaAvanzada.patchValue({fechaDesde: date});
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.busquedaAvanzada.patchValue({fechaHasta: date});
      this.abrirDp();
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.busquedaAvanzada.patchValue({fechaDesde: date});
      this.busquedaAvanzada.patchValue({fechaHasta: null});
    }
  }
  public isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }
  public isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }
  public isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
  public abrirDp(){
    this.mostrarDp = !this.mostrarDp;
  }
}
