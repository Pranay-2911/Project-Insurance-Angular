import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const excludedUrls = ['https://api.cloudinary.com/v1_1/insuranceapp/image/upload']; // Add your Cloudinary base URL here

    const isExcluded = excludedUrls.some(url => request.url.startsWith(url));

    if (isExcluded) {
      return next.handle(request);
    }

    const localToken = localStorage.getItem('token');
    // console.log(localToken);

    request = request.clone({
      // setHeaders:{'Authorization':`Bearer ${localToken}`}
      headers:request.headers.set('Authorization', 'Bearer ' + localToken)
    })

    return next.handle(request);
  }
}
