import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalPollComponent } from './pages/modal-poll/modal-poll.component';

const routes: Routes = [
  { path: 'listado-heroes', loadChildren:() => import('./pages/listado-de-heroes/listado-de-heroes.module').then(m => m.ListadoDeHeroesModule)},
  { path: 'heroe/:id', loadChildren:() => import('./pages/hero-profile/hero-profile.module').then(m => m.HeroProfileModule)},
  { path: 'modal-poll', component: ModalPollComponent},
  { path: '**', redirectTo: '/listado-heroes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }