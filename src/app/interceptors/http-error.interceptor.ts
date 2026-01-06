import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'An unexpected error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side / network error
          message = error.error.message;
        } else {
          // Server-side error
          message = `Request failed (${error.status})`;
        }

        console.error('HTTP Error:', {
          url: request.url,
          status: error.status,
          message
        });

        return throwError(() => new Error(message));
      })
    );
  }
}
