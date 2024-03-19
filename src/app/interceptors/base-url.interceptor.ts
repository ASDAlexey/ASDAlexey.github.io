import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

/**
 * Перехватывает HTTP-запросы и добавляет базовый URL-API, если URL-запроса не начинается с '/'
 * @class BaseUrlInterceptor
 * @implements {HttpInterceptor}
 * @Injectable({ providedIn: 'root' })
 */
@Injectable({ providedIn: 'root' })
export class BaseUrlInterceptor implements HttpInterceptor {
  /**
   * Перехватывает HTTP-запросы и добавляет базовый URL API, если URL-запроса не начинается с '/'
   * @param {HttpRequest<unknown>} req - HTTP-запрос для перехвата
   * @param {HttpHandler} next - Следующий обработчик HTTP в цепочке перехватов
   * @returns {Observable<HttpEvent<unknown>>} - Наблюдаемый объект, который отдаёт HTTP-ответ
   */
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    req = req.clone({ url: environment.API_URL + req.url });

    return next.handle(req);
  }
}
