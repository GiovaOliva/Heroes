import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerInterceptor } from './spinner/spinner.interceptor';
import { StateModule } from './store/state.module';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    StateModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
