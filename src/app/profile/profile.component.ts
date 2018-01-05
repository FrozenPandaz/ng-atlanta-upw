import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from './profile/profile';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators/pluck';
import { tap } from 'rxjs/operators/tap';
import { share } from 'rxjs/operators/share';
import { CookiesService } from '../shared/cookies/cookies.service';
import { List } from '../lander/list/list';
import { ListService } from '../lander/list/list.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'upw-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  public profile: Observable<Profile> = this.activatedRoute.data.pipe(
    pluck('profile'),
    tap((profile: Profile) => {
      this.setMeta(profile);
    })
  );

  public currentList: Observable<List>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cookiesService: CookiesService,
    private listService: ListService,
    private title: Title
  ) { }

  ngOnInit() {
    const listName = this.cookiesService.get('current-list');
    if (listName) {
      this.currentList = this.listService.getList(listName).pipe(
        share()
      );
    }
  }

  getMember(list: List, direction: 'next'|'previous') {
    const offset = direction === 'next' ? 1 : -1;
    const rank = this.getIndex(list);
    return list.members[rank + offset];
  }

  getIndex(list: List): number {
    return list.members.findIndex(item => item.profile.id === this.activatedRoute.snapshot.data.profile.id);
  }

  getRank(list: List): number {
    return this.getIndex(list) + 1;
  }

  private setMeta(profile: Profile) {
    this.title.setTitle(profile.name);
  }
}
