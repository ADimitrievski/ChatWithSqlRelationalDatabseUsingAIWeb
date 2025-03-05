import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  private apiUrl = 'http://localhost:5074/api/OpenAI';

  constructor(private http: HttpClient) {}

  getData(message: string): Observable<any> {
    const params = new HttpParams().set('message', message); 
    return this.http.get<any>(this.apiUrl, { params });
  }
}
