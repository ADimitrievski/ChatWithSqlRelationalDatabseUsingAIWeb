import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  private apiUrl = 'http://localhost:5074/api/OpenAI';

  constructor(private http: HttpClient) {}

  getData(message: string, userId: string): Observable<any> {
    const params = new HttpParams()
      .set('message', message)
      .set('userId', userId); 
    return this.http.get<any>(this.apiUrl, { params });
  }
}
