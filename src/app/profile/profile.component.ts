import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from './profile/profile';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';
import { SessionStorage } from '../shared/session-storage/session-storage';
import { List } from '../lander/list/list';
import { ListService } from '../lander/list/list.service';

@Component({
  selector: 'fbs-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  public profile: Observable<Profile> = this.activatedRoute.data.pipe(
    pluck('profile')
  );

  public currentList: Observable<List>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sessionStorage: SessionStorage,
    private listService: ListService,
  ) { }

  ngOnInit() {
    const listName = this.sessionStorage.getItem('current-list');
    if (listName) {
      this.currentList = this.listService.getList(listName);
    }
  }

  getMember(list: List, direction: 'next'|'previous') {
    const offset = direction === 'next' ? 1 : -1;
    const currentIndex = list.members.findIndex(item => item.profile.id === this.activatedRoute.snapshot.data.profile.id);
    return list.members[currentIndex + offset];
  }

}
