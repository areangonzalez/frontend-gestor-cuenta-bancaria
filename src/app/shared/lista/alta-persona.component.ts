import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lista-alta-persona',
  templateUrl: './alta-persona.component.html',
  styleUrls: ['./alta-persona.component.scss']
})
export class AltaPersonaComponent implements OnInit {

  public configPaginacion = { colleccionSize: 30, page: 1, pageSize: 20 }

  constructor() { }

  ngOnInit(): void {
  }

  cambioPagina(pagina:number){
    console.log(pagina);
  }

}
