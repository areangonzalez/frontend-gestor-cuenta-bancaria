export class Alert {
  tipo: AlertType;
  mensaje: string;
}

export enum AlertType {
  Exitoso,
  Cancelado,
  Confirmar,
  Info,
  Warning,
  ErrorMultiple
}
