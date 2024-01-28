import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + environment.secretKey, // Replace with your actual API key
  });
  constructor(private http: HttpClient) {}

  sendQuary(query: string): Observable<any> {
    console.log('sendQuery');

    const requestBody = {
      model: 'gpt-4-0125-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a wiki writer. Please respond either in outline or wiki article format style',
        },
        {
          role: 'user',
          content: query,
        },
      ],
    };

    return this.http.post(this.apiUrl, requestBody, { headers: this.headers });
  }

  getPoemAboutRecursion(): Observable<any> {
    console.log('get poem');

    const requestBody = {
      model: 'gpt-4-0125-preview',
      messages: [
        {
          role: 'system',
          content:
            'You are a poetic assistant, skilled in explaining complex programming concepts with creative flair.',
        },
        {
          role: 'user',
          content: 'Compose a poem that explains the concept of recursion in programming.',
        },
      ],
    };

    return this.http.post(this.apiUrl, requestBody, { headers: this.headers });
  }
}
