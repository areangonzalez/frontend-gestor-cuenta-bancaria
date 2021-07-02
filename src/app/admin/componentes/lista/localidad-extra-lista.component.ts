import { Component, Input, OnInit } from '@angular/core';
import { LocalidadExtraService, NotificacionService } from './../../../core/services';

@Component({
  selector: 'admin-localidad-extra-lista',
  templateUrl: './localidad-extra-lista.component.html',
  styleUrls: ['./localidad-extra-lista.component.scss']
})
export class LocalidadExtraListaComponent implements OnInit {
  @Input("localidadesExtra") public localidadesExtra: any

  constructor(private _localidadExtraService: LocalidadExtraService, private _msj: NotificacionService) { }

  ngOnInit(): void {
  }

  public borrarLocalidadExtra(confirmacion: boolean, id: number) {
    if (confirmacion) {
      this._localidadExtraService.borrar(id).subscribe(
        respuesta => {
          this._msj.exitoso("Se ha borrado la localidad del listado extra con exito.");
        }, error => { this._msj.cancelado(error); }
      )
    }
  }

}
