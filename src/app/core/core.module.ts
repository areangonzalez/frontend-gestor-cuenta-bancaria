import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilService, JwtService, ApiService, AutenticacionService } from "./services";

@NgModule({
  declarations: [
    UtilService, JwtService, ApiService, AutenticacionService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
