import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:1337/api/auth/local';

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
      .post<UserData>(this.apiUrl, JSON.stringify(credentials), httpOptions)
      .pipe(
        catchError(this.handleError<UserData>('login', { jwt: '', user: {} }))
      );
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
        `${this.apiUrl}/register`,
        JSON.stringify(user),
        httpOptions
      )
      .pipe(
        catchError(
          this.handleError<UserData>('registration', { jwt: '', user: {} })
        )
      );
  }
}

interface UserData {
  jwt: string;
  user: any; // Replace 'any' with the appropriate type for your user object
}
