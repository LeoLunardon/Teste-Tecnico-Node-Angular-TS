import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonRegisterService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createPerson(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.url}/create`, data, {
      headers,
      observe: 'response',
    });
  }
}
