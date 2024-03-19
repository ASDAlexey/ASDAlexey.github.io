import { HttpParams, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { BaseUrlInterceptor } from './base-url.interceptor';

describe('BaseUrlInterceptor', () => {
  let httpMock: HttpTestingController;
  let baseUrlInterceptor: BaseUrlInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BaseUrlInterceptor],
    });

    httpMock = TestBed.inject(HttpTestingController);
    baseUrlInterceptor = TestBed.inject(BaseUrlInterceptor);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should append the base url to the request url', () => {
    const mockRequest = new HttpRequest('GET', '/relativePath', { params: new HttpParams() });

    // eslint-disable-next-line rxjs/no-ignored-observable
    baseUrlInterceptor.intercept(mockRequest, {
      handle(request: HttpRequest<unknown>) {
        expect(request.url).toEqual(environment.API_URL + mockRequest.url);
        return new Observable();
      },
    });
  });
});
