
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

const baseURL = 'https://localhost:44378/api/document';

@Injectable({
    providedIn: 'root'
  })


export class DocumentService {

    constructor(private httpClient:HttpClient) 
    { }
  
    getAll(): Observable<any> {
        return this.httpClient.get(baseURL);
    }
}
