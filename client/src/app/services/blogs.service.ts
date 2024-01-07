import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private apiUrl = 'http://localhost:1337/api';
  constructor(private http: HttpClient) { }

  getBlog() {
    return this.http.get(`${this.apiUrl}/blogs`);
  }
}
