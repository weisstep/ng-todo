// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // HttpClient still the same
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get('http://localhost:3000');  // Example API
  }
}