import { Injectable } from '@angular/core';
import { Token } from '../models/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Login } from '../models/login';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private authService: AuthService) { }
  loginSubmit (login: Login): Observable<Token> {
    let body = "grant_type=password&username="+login.username+"&password="+login.password;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/x-www-form-urlencoded');
    headers = headers.append('Authorization','Basic c2FtcGxlSWQ6c2FtcGxlU2VjcmV0');
    const httpOptions = {
      headers: headers
    };
    return this.http.post<Token>("http://localhost:8080/oauth/token", body, httpOptions).pipe(
      tap((token: Token) => {
        this.authService.login(token);
      }),
      catchError(this.handleError<Token>("login error"))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
