import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Alert, AlertType } from "../models";

@Injectable({ providedIn: 'root' })
export class NotificacionService {
    private subject = new Subject<any>();

    sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    alert(tipo: AlertType, mensaje: string){
        this.subject.next(<Alert>{tipo:tipo, mensaje:mensaje})
    }

    exitoso(mensaje: string){
        this.alert(AlertType.Exitoso, mensaje);
    }
    cancelado(mensaje: string) {
        this.alert(AlertType.Cancelado, mensaje);
    }
    confirmar(mensaje: string){
      this.alert(AlertType.Confirmar, mensaje);
    }
}
