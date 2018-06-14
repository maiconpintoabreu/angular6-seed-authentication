import { Injectable } from '@angular/core';
import { Token } from '../models/token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Login } from '../models/login';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient, private authService: AuthService) { }
    private  URL:string = "http://localhost:8080/users";
    getUsers() : Observable<User[]>{
        let headers = new HttpHeaders();
        var token = this.authService.getToken();
        headers = headers.append('Authorization',token.token_type+" "+token.access_token);
        const httpOptions = {
        headers: headers
        };
        return this.http.get<User[]>(this.URL, httpOptions);
    }
    getUser(id: string) : Observable<User>{
        let headers = new HttpHeaders();
        var token = this.authService.getToken();
        headers = headers.append('Authorization',token.token_type+" "+token.access_token);
        const httpOptions = {
            headers: headers
        };
        return this.http.get<User>(this.URL+"/"+id, httpOptions);
    }
    newUser(user: User) : Observable<User>{
        let headers = new HttpHeaders();
        var token = this.authService.getToken();
        headers = headers.append('Authorization',token.token_type+" "+token.access_token);
        const httpOptions = {
            headers: headers
        };
        return this.http.post<User>(this.URL+"/new", user, httpOptions);
    }
    updateUser(user:User) : Observable<User>{
        let headers = new HttpHeaders();
        var token = this.authService.getToken();
        headers = headers.append('Authorization',token.token_type+" "+token.access_token);
        const httpOptions = {
            headers: headers
        };
        return this.http.post<User>(this.URL+"/"+user.id+"/update", user, httpOptions);
    }
    deleteUser(id: string) : Observable<string>{
        let headers = new HttpHeaders();
        var token = this.authService.getToken();
        headers = headers.append('Authorization',token.token_type+" "+token.access_token);
        const httpOptions = {
            headers: headers
        };
        return this.http.delete<string>(this.URL+"/"+id, httpOptions);
    }
}