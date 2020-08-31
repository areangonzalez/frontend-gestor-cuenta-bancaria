import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaComponent } from './persona.component';
import { PersonaRoutingModule } from './persona-routing.module';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [ PersonaComponent ],
  imports: [
    CommonModule, SharedModule, PersonaRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PersonaModule { }
