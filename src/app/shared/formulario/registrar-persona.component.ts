import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-registrar-persona',
  templateUrl: './registrar-persona.component.html',
  styleUrls: ['./registrar-persona.component.scss']
})
export class RegistrarPersonaComponent implements OnInit {
  public personaForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.personaForm = _fb.group({
      tipo_documentoid: '',
      nro_documento: '',
      cuil: '',
      apellido: '',
      nombre: '',
      fechaNacimiento: '',
      fecha_nacimiento: '',
      estado_civilid: '',
      sexoid: '',
      generoid: '',
      nacionalidadid: '',
      telefono: '',
      celular: '',
      lugar: _fb.group({
        localidadid: '',
        calle: '',
        altura: '',
        piso: '',
        depto: '',
        escalera: ''
      })
    })
  }

  ngOnInit(): void {
  }

}
