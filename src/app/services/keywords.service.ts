import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Keyword} from 'src/app/data-models/keyword'


const baseURL = 'https://localhost:44378/api/keywords';

@Injectable({
  providedIn: 'root'
})
export class KeywordsService {

  constructor(private httpClient:HttpClient) 
  { }

  getAll(): Observable<any> {
    return this.httpClient.get(baseURL);
  }

  getById(id : number): Observable<any> {
    return this.httpClient.get(`${baseURL}/${id}`);
  }

  create(data: Keyword): Observable<any> {
    return this.httpClient.post(baseURL, data);
  }

  update(id :number, data:Keyword): Observable<any> {
    return this.httpClient.put(baseURL, data);
  }

  delete(id:number): Observable<any> {
    return this.httpClient.delete(`${baseURL}/${id}`);
  }

  searchByName(name:string): Observable<any> {
    return this.httpClient.get(`${baseURL}?name=${name}`);
  }

}
