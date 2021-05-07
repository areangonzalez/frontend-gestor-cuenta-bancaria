import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurarPagina } from '../core/models';
import { ConfiguracionParaPaginarService, ExportService, NotificacionService, UtilService } from '../core/services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-historial-exportacion',
  templateUrl: './historial-exportacion.component.html',
  styleUrls: ['./historial-exportacion.component.scss']
})
export class HistorialExportacionComponent implements OnInit {
  public historial: any;
  public filtradoBusqueda: any = {};
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obteiene el objeto de configuracion de rango y paginado de comprobantes
  public busquedaAvanzada: FormGroup;

  // Variables para calendarios
  public hoveredDate: NgbDate | null = null; // Resalta la fecha
  public fromDate: NgbDate | null = null; // fecha desde
  public toDate: NgbDate | null = null; // fecha hasta
  public mostrarDp: boolean = false; // Muestra el DatePicker

  constructor(
    private _route: ActivatedRoute, private _configurarPaginacion: ConfiguracionParaPaginarService,
    private _exportService: ExportService, private _msj: NotificacionService, private _fb: FormBuilder,
    private _util: UtilService
  ) {
    this.busquedaAvanzada = _fb.group({
      export_at_desde: '',
      exportAtDesde: '',
      export_at_hasta: '',
      exportAtHasta: '',
      tipo: ''
    });
  }

  ngOnInit(): void {
    this.prepararListado(this._route.snapshot.data["historial"], 1);
  }

  prepararListado(listado: any, pagina: number) {
    // preparo la variable con la configuracion para el paginado
    this.configPaginacion = this._configurarPaginacion.config(listado, pagina);

    this.historial = listado.resultado;
  }

  realizarBusqueda(params: any, pagina: number) {
    Object.assign(params, {page: pagina-1, paginasize: 20});
    this.filtradoBusqueda = params;
    this._exportService.buscar(params).subscribe(
      respuesta => {
        this.prepararListado(respuesta, pagina)
      }, error => { this._msj.cancelado(error); }
    )
  }
 /**
  * cambio la pagina del listado
  * @param pagina numero de pagina
  */
  cambiarPagina(pagina: number) {
    this.realizarBusqueda(this.filtradoBusqueda, pagina);
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

  /**
   * arma el listado de parametros a buscar para la api.
   */
   public buscar(){
    let busquedaAvanzada = this.busquedaAvanzada.value;
    let apiBusqueda:any = {};
    let esTrue: boolean = false;

    for (const clave in busquedaAvanzada) {
      if (clave != 'exportAtDesde' && clave != 'exportAtHasta'){
        if(busquedaAvanzada[clave] !== '' && busquedaAvanzada[clave] !== null && (busquedaAvanzada[clave])){
          Object.assign(apiBusqueda, {[clave]: busquedaAvanzada[clave]});
          esTrue = true;
        }
      }
    }
    this.realizarBusqueda(apiBusqueda, this.configPaginacion.page);
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
      this.busquedaAvanzada.patchValue(busqueda);
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

  /* ### DATE PICKER CONFIG ### */
  /**
   * Selecciona el rango de fecha DESDE/HASTA
   * @param date [NgbDate] objeto de fecha del DatePicker
   */
   public onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.busquedaAvanzada.patchValue({exportAtDesde: date});
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.busquedaAvanzada.patchValue({exportAtHasta: date});
      this.abrirDp();
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.busquedaAvanzada.patchValue({exportAtDesde: date});
      this.busquedaAvanzada.patchValue({exportAtHasta: null});
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
