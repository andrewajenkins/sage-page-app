import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:4000/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.http.post<any>(`${this.apiUrl}login`, { username, password }).subscribe(
        (response) => {
          this.isAuthenticated.next(true);
          localStorage.setItem('authToken', response.token); // Store the token
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        },
      );
    });
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.removeItem('authToken'); // Clear the token
    // Perform other logout logic if needed
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
  register(username: string, password: string) {
    return this.http.post<any>(this.apiUrl + 'register', { username, password });
  }
}
