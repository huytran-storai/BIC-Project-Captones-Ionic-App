import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PromosService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) { }

  getPromocodes() {
    return this.http.get(`${this.apiUrl}/promocodes`);
  }
}
