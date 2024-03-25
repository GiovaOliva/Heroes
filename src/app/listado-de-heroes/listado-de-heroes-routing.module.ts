import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoDeHeroesComponent } from './listado-de-heroes.component';

const routes: Routes = [
  {path: '', component: ListadoDeHeroesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListadoDeHeroesRoutingModule { }
