import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from './spinner.service';

let requestCount = 0;
@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private readonly Spinner: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    requestCount++;
    this.Spinner.show();

    return next.handle(request).pipe(
      finalize(() => {
        requestCount--;
        if (requestCount === 0) {
        this.Spinner.hide()}})
    );
  }
}
