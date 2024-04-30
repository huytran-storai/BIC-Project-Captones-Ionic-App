import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authApiUrl = 'http://localhost:1337/api/auth';

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed`);
      console.log(error);
      return of(result as T);
    };
  }

  login(credentials: {
    identifier: string;
    password: string;
  }): Observable<UserData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<UserData>(
        `${this.authApiUrl}/local`,
        JSON.stringify(credentials),
        httpOptions
      )
      .pipe(catchError(this.handleError('login', {})));
  }

  register(user: {
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  }): Observable<UserData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<UserData>(
        `${this.authApiUrl}/local/register`,
        JSON.stringify(user),
        httpOptions
      )
      .pipe(catchError(this.handleError('registration', {})));
  }
}

interface UserData {
  jwt?: string;
  user?: any; // Replace 'any' with the appropriate type for your user object
}
