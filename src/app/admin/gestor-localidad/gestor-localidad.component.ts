import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { configurarListas } from 'src/app/core/models';
import { ConfiguracionParaPaginarService, NotificacionService } from 'src/app/core/services';

@Component({
  selector: 'app-gestor-localidad',
  templateUrl: './gestor-localidad.component.html',
  styleUrls: ['./gestor-localidad.component.scss']
})
export class GestorLocalidadComponent implements OnInit {
  public listas = {} as configurarListas;
  public localidadesExtra: any = [];

  constructor(private _route: ActivatedRoute, private _configPagina: ConfiguracionParaPaginarService, private _msj: NotificacionService) { }


  ngOnInit(): void {
    this.listas.backendLocalidades = this._route.snapshot.data["backendLocalidades"];
    this.listas.provincias = this._route.snapshot.data["provincias"];
    this.listas.localidadesExtras = this._route.snapshot.data["localidadesExtras"];
  }

}
