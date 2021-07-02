import { Component, Input, OnInit } from '@angular/core';
import { LocalidadExtraService, NotificacionService } from './../../../core/services';

@Component({
  selector: 'admin-localidad-lista',
  templateUrl: './localidad-lista.component.html',
  styleUrls: ['./localidad-lista.component.scss']
})
export class LocalidadListaComponent implements OnInit {
  @Input("localidades") public localidades: any;
  @Input("provincias") public provincias: any;

  constructor(private _localidadExtraService: LocalidadExtraService, private _msj: NotificacionService) { }

  ngOnInit(): void {
  }
  /**
   * agrega una localidad en el listado extra
   * @param confirmacion valor booleano que indica la confirmacion del agregado
   * @param id numero identificador de la localidad a agregar
   */
  agregarLocalidadExtra(confirmacion: boolean, id:number) {
    if (confirmacion) {
      this._localidadExtraService.guardar(id).subscribe(
        respuesta => {
          this._msj.exitoso("Se ha agreado correctamente la localidad en listado extras.");
        }, error => { this._msj.cancelado(error); }
      )
    }
  }

}
