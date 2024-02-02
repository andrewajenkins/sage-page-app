import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + process.env.OPENAI_SECRET_KEY, // Replace with your actual API key
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
          role: 'system',
          content: 'Always and only respond in markdown format.',
        },
        {
          role: 'user',
          content: query,
        },
      ],
    };

    return this.http.post(this.apiUrl, requestBody, { headers: this.headers });
  }
}
