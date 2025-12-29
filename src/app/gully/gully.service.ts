import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GullyRequest, GullyResponse } from '../models/gully.model';

@Injectable({
  providedIn: 'root'
})
export class GullyService {
  private readonly baseUrl = 'https://localhost:7129/api/v1/gullies';

  constructor(private http: HttpClient) {}

  saveGully(gully: GullyRequest): Observable<GullyResponse> {
    return this.http.post<GullyResponse>(this.baseUrl, gully);
  }
}
