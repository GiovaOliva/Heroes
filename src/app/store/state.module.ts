import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HeroeState } from './hero.state';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      NgxsModule.forRoot([HeroeState], {developmentMode: !environment.production}),
      NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
      NgxsLoggerPluginModule.forRoot({disabled: environment.production}),
    ]
})


export class StateModule { }