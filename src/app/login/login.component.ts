import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AutenticacionService } from '../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public mensaje: string = '';
  public returnUrl: string;
  public huboError: boolean = false;
  public submitted: boolean = false;

  constructor(private _fb: FormBuilder, private _autenticacion: AutenticacionService, private _route: ActivatedRoute, private _router: Router) {
    this.loginForm = _fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    // verifico si esta logueado
    this.estaLogueado();
  }

  ngOnInit(): void {
    // Guardo la ultima ruta a la que se querido acceder
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/cuentas';
  }

  ingresar() {
    this._autenticacion.login((this.loginForm.value))
    .pipe(first())
    .subscribe(
      user => {
        this.redirigirUsuario(user.rol);
      },
      error => {
        this.huboError = true;
        this.mensaje = "Por favor verifique sus datos.";
      });
  }

  estaLogueado() {
    if (this._autenticacion.loggedIn) {
      this._autenticacion.loggedIn.rol;
    }
  }

  redirigirUsuario(userRol: string) {
    if ( userRol === 'usuario' || userRol === 'admin' ) {
      this._router.navigate(['./cuentas']);
    }else if ( userRol === 'soporte' ) {
      this._router.navigate(['./admin']);
    }
  }

}
