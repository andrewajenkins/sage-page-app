import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:4000/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(this.apiUrl + 'login', { username, password });
  }

  register(username: string, password: string) {
    return this.http.post<any>(this.apiUrl + 'register', { username, password });
  }
}
