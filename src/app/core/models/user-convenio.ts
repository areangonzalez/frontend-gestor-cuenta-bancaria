export interface IUserConvenio {
  mostrar: boolean,
  convenio: TipoConvenio[]
}


export class TipoConvenio {
  id: number;
  nombre: string;
}

/**
 * Clase que construye el objeto de la configuracion de pagina
 */
export class UserConvenio implements IUserConvenio {
  public mostrar: boolean;
  public convenio: TipoConvenio[];


  constructor() {
    this.mostrar = false;
    this.convenio = [];
    }
}
