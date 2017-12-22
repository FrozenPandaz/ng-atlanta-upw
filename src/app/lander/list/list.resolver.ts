import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { List } from './list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ListService } from './list.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ListResolver implements Resolve<List> {

  constructor(private listService: ListService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<List> {
    return this.listService.getList(route.params.listName);
  }
}
