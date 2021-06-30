import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from './../../../core/services';
import { configurarListas } from '../../../core/models';

@Component({
  selector: 'app-localidad-form',
  templateUrl: './localidad-form.component.html',
  styleUrls: ['./localidad-form.component.scss']
})
export class LocalidadFormComponent implements OnInit {
  @Input("config-listas") public configurarListas: configurarListas; // array que contiene el/los listados para el componente
  @Input("localidad") public localidad?: any;
  public localidadForm: FormGroup;
  public submitted: boolean = false;
  public departamentos: any = [];

  constructor(private _fb: FormBuilder, private _departamentoService: DepartamentoService) {
    this.localidadForm = _fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      codigo_postal: ['', [Validators.required]],
      departamentoid: ['', [Validators.required]],
      provinciaid: ''
    });
  }

  ngOnInit(): void {
    if (this.localidad) {
      if (this.localidad.provinciaid) {
        this.departamentoPorProvincia(this.localidad.provinciaid);
      }
      this.localidadForm.patchValue(this.localidad);

    }
  }

  private departamentoPorProvincia() {
  }

}
