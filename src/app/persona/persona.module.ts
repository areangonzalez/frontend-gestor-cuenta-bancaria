import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { PersonaComponent } from './persona.component';


@NgModule({
  declarations: [
    PersonaComponent
  ],
  imports: [
    CommonModule, SharedModule
  ]
})
export class PersonaModule { }
