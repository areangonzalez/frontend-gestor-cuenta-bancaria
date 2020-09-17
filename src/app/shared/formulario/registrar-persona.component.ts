import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { configurarListas } from 'src/app/core/models';
import { PersonaService, UtilService } from 'src/app/core/services';

@Component({
  selector: 'shared-registrar-persona',
  templateUrl: './registrar-persona.component.html',
  styleUrls: ['./registrar-persona.component.scss']
})
export class RegistrarPersonaComponent implements OnInit {
  @Input("persona") public persona: any; // atributo que solo es utilizado para la edicion
  @Input("config-listas") public configurarListas: configurarListas; // array que contiene el/los listados para el componente
  @Output("cancelarForm") public cancelarForm = new EventEmitter(); // cancela el formulario devolviendo un false al componente padre
  public personaForm: FormGroup;
  public submitted: boolean = false;
  public cuil_medio: string = '';

  constructor(private _fb: FormBuilder, private _util: UtilService, private _personaService: PersonaService) {
    this.personaForm = _fb.group({
      tipo_documentoid: ['', [Validators.required]],
      nro_documento: ['', [Validators.required, Validators.minLength(7)]],
      cuil: '',
      cuil_primero: '',
      cuil_ultimo: '',
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fechaNacimiento: ['', [Validators.required]],
      fecha_nacimiento: '',
      estado_civilid: '',
      sexoid: ['', [Validators.required]],
      generoid: '',
      nacionalidadid: ['', [Validators.required]],
      telefono: '',
      celular: '',
      email: ['', [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      lugar: _fb.group({
        localidadid: ['', [Validators.required]],
        calle: ['', [Validators.required, Validators.minLength(3)]],
        altura: ['', [Validators.required]],
        barrio: '',
        piso: '',
        depto: '',
        escalera: ''
      })
    });
  }

  ngOnInit(): void {
    // verifico si la variable tiene datos
    if (this.persona) {
      // completo el formulariocon el objeto de persona
      this.editarPersona(this.persona);
    }
  }
  /**
   * Configuro los datos de la persona dentro del formulario
   * @param persona objeto que contiene los datos de la persona
   */
  public editarPersona(persona: any) {
    if (persona['cuil'] != '') {
      persona['cuil_primero'] = persona['cuil'].substring(0, 2);
      persona['cuil_ultimo'] = persona['cuil'].substring(10);
      this.cuil_medio = persona['nro_documento'];
    }
    this.validarCuil(persona['nro_documento']);
    // verifico que exista y armo la fecha de nacimiento
    if (persona['fecha_nacimiento'] != '') {
      let fecha = persona['fecha_nacimiento'].split("-");
      persona['fechaNacimiento'] = { year: parseInt(fecha[0]), month: parseInt(fecha[1]), day: parseInt(fecha[2]) };
    }

    this.personaForm.patchValue(persona);
  }
  /**
   * @function soloNumero valida que los datos ingresados en un input sean solo numeros.
   * @param datos objeto que contiene los datos de un input.
   */
  public soloNumero(datos:any){
    if (!this._util.validarNumero(datos.value)) {
      datos.value = datos.value.substring(0,datos.value.length - 1);
    }
  }
  /**
   * @function validarCuil valida el numero de cuil que esta en el medio
   * @param nroDocumento número de documento para ser validado.
   */
  public validarCuil(nroDocumento:string) {
    if (nroDocumento.length == 7) {
      this.cuil_medio = '0' + nroDocumento;
    }else{
      this.cuil_medio = nroDocumento;
    }
  }
  /**
   * @function armarCuil funcion que arma el cuil uniendo las variables de los formularios
   */
  public armarCuil(){
    const cuil_primero = this.personaForm.get("cuil_prin").value;
    const cuil_ult = this.personaForm.get("cuil_fin").value;
    // verifico si las variables son distintas a vacio
    // si la validacion es correcta seteo el valor del formulario con el cuil armado
    if (cuil_primero != '' && cuil_ult != '') {
        return this.personaForm.setValue({"cuil": cuil_primero + this.cuil_medio + cuil_ult});
    }else{ // si esta vacio seteo el valor del formulario en vacion
        return this.personaForm.setValue({"cuil": ''});
    }
  }
  /**
   * @function formatFechaNaciento convierte la fecha en un string
   * @param obj la fecha viene en formato objeto
   */
  public formatFechaNacimiento(obj:any){
    this.personaForm.setValue({fecha_nacimiento: this._util.formatearFecha(obj.day, obj.month, obj.year, "yyyy-MM-dd")});
  }
  /**
   * Convierto el email en minuscula
   * @param palabra texto ingresado por usuario
   */
  public aMinuscula(palabra:any){
    palabra.value = palabra.value.toLowerCase();
  }

  cancelar() {
    this.cancelarForm.emit(true);
  }

  public validarPersona() {
    this.submitted = true;
    if (this.personaForm.invalid) { // verifico la validación en los campos del formulario
      /* if (this.formPersona.get('contacto').value.email !== this.formPersona.get('contacto').value.email.toLowerCase()){
        this._mensajeService.cancelado("El email no puede estar en mayusculas!!", [{name:''}]);
      }else{
        this._mensajeService.cancelado("Campos sin completar!!", [{name:''}]);
      } */
      return;
    }else{ // si pasa la validación
      this.submitted = false;
      console.log(this.personaForm.invalid)
      /* if (this.formPersona.get('cuil').value.length < 10){
        this.formPersona.get('cuil').setValue('');
      }
      let id = this.formPersona.value.id;
      let persona = this.personaModel.deserealize(this.formPersona.value);
      this.guardarPersona(persona,id); */

    }
  }

}
