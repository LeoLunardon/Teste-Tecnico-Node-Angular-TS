import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterResponse {
  email: string;
  password: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(
    email: string,
    password: string,
    username: string
  ): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      'http://localhost:3000/createUser',
      { email, password, username }
    );
  }
}
