import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Api interceptor takes request url
// and appends the correct api url

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = this._setUrl(req);
    req = this._setContentType(req);
    return next.handle(req);
  }

  private _setUrl(request: HttpRequest<any>): HttpRequest<any> {
    if (!request.url.startsWith('http')) {
      request = request.clone({
        url: `${environment.apiUrl}/${request.url}`,
      });
    }

    return request;
  }

  private _setContentType(request: HttpRequest<any>): HttpRequest<any> {
    if (!request.headers.get('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }

    return request;
  }
}
