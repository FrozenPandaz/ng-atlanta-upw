import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { List } from './list';

@Injectable()
export class ListService {

  constructor(private http: HttpClient) {}

  getList(listName: string): Observable<List> {
    return this.http.get<List>('http://localhost:4300/api/list/' + listName);
  }

}
