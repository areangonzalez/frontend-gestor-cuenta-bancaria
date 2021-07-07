import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UtilService {
  constructor(){}

  /**
   * @function objetoAFecha funcion que devuelve una fecha en String.
   * @param objeto [Object] fecha ingresada en objeto, definicion: { 'day': 5, 'month': 3, 'year': 2019 }.
   * @param formato [String] Formato de la fecha deseada, definido como: 'yyyy-MM-dd' o 'dd/MM/yyyy'.
   */
  public formatearFecha(dia:number, mes:number, anio:number, formato:string) {
    let fecha: string = '';
    switch(formato){
      case "dd/MM/yyyy":
        fecha = ((dia < 10) ? "0" + dia : dia ) + '-' + ((mes < 10) ? "0" + mes : mes ) + '-' + anio;
        break;
      case "yyyy-MM-dd":
        fecha = anio + '-' + ((mes < 10) ? "0" + mes : mes ) + '-' + ((dia < 10) ? "0" + dia : dia );
        break;
      default:
      fecha = anio + '-' + ((mes < 10) ? "0" + mes : mes ) + '-' + ((dia < 10) ? "0" + dia : dia );
        break;
    }

    return fecha;
  }

  /**
   * @function validarNumero valida si el valor es un numero
   * @param numero [string] parametro que sera validado.
   */
  public validarNumero(numero:any):boolean{
    const patternNum = /^([0-9])*$/;
    return patternNum.test(numero);
  }

  public completarConCeros(valor:string, cantidad:number) {
    let valorFinal: string = '';
    let cantidadReal: number = (cantidad - valor.length);

    for (let i = 0; i < cantidadReal; i++) {
       valorFinal += '0';
    }

    return valorFinal + valor;
  }
  /**
   * Verifica si hay cambios en un listado dependiendo del tipo de dato
   * @param listado listado a verificar
   * @param atributo nombre del atributo del listado a verificar
   * @param valor el valor a verificar el cambio
   */
  verificarCambio(listado:any, atributo: string, valor: any) {
    let cambio = false;
    for (const k in listado) {
      if (k === atributo) {
        if (listado[atributo] !== valor ) {
          cambio = true;
        }
      }
    }
    return cambio;
  }
  /**
   * Busco en un listado el nombre de un valor por su id
   * @param listado listado compuesto por id - nombre
   * @param id identificador del elemento a buscar
   */
  buscarDatosPorId(listado:any, id:any) {
    for (let i = 0; i < listado.length; i++) {
      if (parseInt(listado[i].id) == parseInt(id) ) {
        return listado[i];
      }
    }
  }
  /**
   * se valida si el numero ingresado tiene un punto para separar
   * sus decimales
   * @param numero numero que se testearar para su validacion
   */
  public validarNumeroDecimal(numero:any):boolean {
    const pattern = /^\d*(\.\d{0,2})?$/;
    return pattern.test(numero);
  }
  /**
   * valida un numero con decimales
   */
  public validarMoneda(moneda:any):boolean {
    const pattern = /^\d*(\.\d{0,2})?$/;
    return pattern.test(moneda);
  }
  /**
   * validacion de numero cuil por su ultimo digito
   * @param cuit stringo con el numero de cuit
   * @returns boolean true si es correcto, false si es incorrecto
   */
  validarUltimoDigitoCuil(cuit: string) {
    if (cuit.length !== 11) {
      return false;
    }

    let acumulado = 0;
    let digitos: any = cuit.split('');
    let digito = parseInt(digitos.pop());

    for (let i = 0; i < digitos.length; i++) {
      acumulado += digitos[9 - i] * (2 + (i % 6));
    }

    let verif = 11 - (acumulado % 11);

    if (verif === 11) {
      verif = 0;
    } else if (verif === 10) {
      verif = 9;
    }

    return digito === verif;
  }

}
