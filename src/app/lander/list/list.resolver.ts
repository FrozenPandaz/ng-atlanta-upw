import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { List } from './list';
import { ListService } from './list.service';

@Injectable()
export class ListResolver implements Resolve<List> {

  constructor(private listService: ListService) {
  }

  resolve(route: ActivatedRouteSnapshot): List {
    return this.listService.getList(route.params.listName);
  }
}
