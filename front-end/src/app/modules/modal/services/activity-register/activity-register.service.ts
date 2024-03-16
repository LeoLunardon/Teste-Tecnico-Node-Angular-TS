import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonsActivitiesService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllPersons(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.url}/getAllPersons`, { headers });
  }

  addActivitiesToPerson(personId: string, activities: any[]): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const requestData = {
      activities: activities.map(activity => ({ ...activity, personId })),
    };

    return this.http.post(`${this.url}/${personId}/addActivitiesToPerson`, requestData, { headers, observe: 'response' });
  }
}
