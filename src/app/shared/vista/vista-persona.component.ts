import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vista-persona',
  templateUrl: './vista-persona.component.html',
  styleUrls: ['./vista-persona.component.scss']
})
export class VistaPersonaComponent implements OnInit {
  @Input("persona") public persona: any;
  @Input("listaBancos") public listaBancos: any;

  constructor() { }

  ngOnInit(): void {
  }

}
