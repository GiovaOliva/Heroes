import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoDeHeroesComponent } from './listado-de-heroes/listado-de-heroes.component';
import { HeroProfileComponent } from './hero-profile/hero-profile.component';
import { ModalPollComponent } from './modal-poll/modal-poll.component';

const routes: Routes = [
  { path: 'listado-heroes', loadChildren:() => import('./listado-de-heroes/listado-de-heroes.module').then(m => m.ListadoDeHeroesModule)},
  { path: 'heroe/:id', component: HeroProfileComponent},
  { path: 'modal-poll', component: ModalPollComponent},
  { path: '**', redirectTo: '/listado-heroes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }