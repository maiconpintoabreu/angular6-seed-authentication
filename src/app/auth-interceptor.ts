import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService,private router: Router) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
            }),
            catchError((error: any) => {
                console.log(error);
                if (error instanceof HttpErrorResponse) {
                    //status === 0 to fix cors issue
                    if (error.status === 401 || error.status === 0) {
                        this.auth.loginRedirect();
                        return throwError(error);
                    }
                }
            })
        );
    }
}