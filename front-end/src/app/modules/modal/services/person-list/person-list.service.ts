import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonsListService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllPersons(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.url}/getAllPersons`, { headers });
  }

  getPersonWithActivities(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.url}/personWithActivities/${id}`, { headers });
  }

  deleteActivityFromPerson(activityId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(
      `${this.url}/${activityId}/deleteActivity`,
      {
        headers,
      }
    );
  }
}
