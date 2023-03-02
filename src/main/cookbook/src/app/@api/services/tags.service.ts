import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tag} from '../models/tag';
import {Observable} from 'rxjs';

import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

    rootURL: string = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.rootURL + '/tags');
    }
}
