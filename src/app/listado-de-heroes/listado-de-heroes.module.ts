import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoDeHeroesRoutingModule } from './listado-de-heroes-routing.module';
import { ListadoDeHeroesComponent } from './listado-de-heroes.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListadoDeHeroesComponent],
  imports: [
    CommonModule,
    ListadoDeHeroesRoutingModule,
    FormsModule
  ],
  providers: []
})
export class ListadoDeHeroesModule { }
