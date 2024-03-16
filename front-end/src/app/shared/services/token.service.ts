import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  checkTokenValidity(): boolean {
    const tokenCreatedAt = new Date(
      localStorage.getItem('tokenCreatedAt') || ''
    );
    const now = new Date();
    const oneHour = 60 * 60 * 1000;
    

    if (now.getTime() - tokenCreatedAt.getTime() > oneHour) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenCreatedAt');
      return false;
    }

    return true;
  }
}
