import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../data/types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private jsonUrl = 'app/data/mock-data.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<Data> {

    return this.http.get<Data>(this.jsonUrl);
  }
}
