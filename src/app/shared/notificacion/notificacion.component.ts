import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from 'src/app/core/models';
import { NotificacionService } from 'src/app/core/services';


@Component({
  selector: 'notificacion-mensaje',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;
  mensaje: any;
  tipo: number;
  errors: any = [];
  existen: any = false;

  constructor(private router: Router, private alertService: NotificacionService) { }

  ngOnInit() {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertService.getMessage()
        .subscribe((alert: Alert) => {
            // clear alerts when an empty alert is received
            if (!alert) {
              this.mensaje = undefined;
                return;
            }else{
              this.tipo = alert.tipo;
              if (this.tipo === 6) {
                this.crearNotificacion(alert.mensaje);
              } if (this.tipo === 7) {
                this.crearNotificacionAdmin(alert.mensaje);
              }else{
                this.mensaje = alert.mensaje;
              }
            }
       });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            this.alertService.clearMessage();
        }
    });
  }

  crearNotificacion(arrMsj: any) {
    this.mensaje = "Se han importado " + arrMsj["creadas"] + " cuenta/s en el sistema.";
    this.existen = (arrMsj["existen"]) ? "Se han encontrado " + arrMsj["existen"] + " cuenta/s que ya existen dentro del sistema.": false;
    this.errors = (arrMsj.errors !== undefined) ? arrMsj.errors : [];
  }

  crearNotificacionAdmin(objMsj: any) {
    this.mensaje = '';
    if (this.msjEsCadena(objMsj)){
      this.mensaje = objMsj;
    }else{
      for (let i = 0; i < objMsj.length; i++) {
        for (const key in objMsj[i]) {
          this.mensaje += (this.mensaje != '') ? ' - ' : '';
          if (key != undefined) {
            let msj = '';
            for (let j = 0; j < objMsj[i][key].length; j++) {
              msj += (msj != undefined && msj != '') ? ', ' : '';
              msj += objMsj[i][key][j];
            }
            this.mensaje += msj;
          }
        }
      }
    }
  }

  msjEsCadena(mensaje:any) {
    return (typeof mensaje === 'string');
  }

  ngOnDestroy() {
      // unsubscribe to avoid memory leaks
      this.alertSubscription.unsubscribe();
      this.routeSubscription.unsubscribe();
  }

  removeAlert() {
    this.alertService.clearMessage();
  }

  cssClass(tipo) {
      const classes = ['alert', 'alert-dismissable'];

      const alertTypeClass = {
          [AlertType.Exitoso]: 'alert alert-success',
          [AlertType.Cancelado]: 'alert alert-danger',
          [AlertType.Confirmar]: 'alert alert-success',
          [AlertType.Info]: 'alert alert-info',
          [AlertType.Warning]: 'alert alert-warning',
          [AlertType.ErrorMultiple]: 'alert alert-danger',
          [AlertType.ImportacionExitoso]: 'alert alert-success',
          [AlertType.ErrorAdmin]: 'alert alert-danger'
      }

      classes.push(alertTypeClass[tipo]);

      return classes.join(' ');
  }

  iconClass(tipo: number) {
    if (!alert) { return; }
      switch (tipo) {
          case AlertType.Exitoso:
            return 'far fa-check-circle';
          case AlertType.Cancelado:
            return 'far fa-times-circle';
          case AlertType.Confirmar:
            return 'far fa-check-circle';
          case AlertType.ErrorMultiple:
            return 'far fa-times-circle';
          case AlertType.ImportacionExitoso:
            return 'far fa-check-circle';
          case AlertType.ErrorAdmin:
            return 'far fa-times-circle';
      }
  }

  cssIconColor(tipo: number) {
    if (!alert) { return; }
      switch (tipo) {
          case AlertType.Exitoso:
            return 'text-success';
          case AlertType.Cancelado:
            return 'text-danger';
          case AlertType.Confirmar:
            return 'text-success';
          case AlertType.ErrorMultiple:
            return 'text-danger';
          case AlertType.ImportacionExitoso:
            return 'text-success';
          case AlertType.ErrorAdmin:
            return 'text-danger';
      }
  }



  obtenerTitulo(tipo: number) {
    if (!alert) { return; }
      switch (tipo) {
          case AlertType.Exitoso:
            return 'Exitoso';
          case AlertType.Cancelado:
            return 'Cancelado';
          case AlertType.Confirmar:
            return 'Exitoso';
          case AlertType.ErrorMultiple:
            return 'Cancelado';
          case AlertType.ImportacionExitoso:
            return 'Se a importado con exito';
          case AlertType.ErrorAdmin:
            return 'Cancelado';
      }
  }


}
