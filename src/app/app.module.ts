import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroProfileComponent } from './hero-profile/hero-profile.component';
import { ListadoDeHeroesComponent } from './listado-de-heroes/listado-de-heroes.component';
import { ModalPollComponent } from './modal-poll/modal-poll.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { environment } from './environments/environment';
import { HeroeState } from './store/hero.state';
import { HeroesService } from './heroes.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroProfileComponent,
    ListadoDeHeroesComponent,
    ModalPollComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgxsModule.forRoot([HeroeState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production})
    ,NgxsLoggerPluginModule.forRoot({disabled: environment.production}),

  ],
  providers: [
    HeroesService, // Suponiendo que ya hayas agregado HeroesService aquí
    HeroeState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
