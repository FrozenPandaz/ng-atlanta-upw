import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators/pluck';
import { share } from 'rxjs/operators/share';
import { tap } from 'rxjs/operators/tap';

import { List } from '../../lander/list/list';
import { ListService } from '../../lander/list/list.service';
import { CookiesService } from '../../shared/cookies/cookies.service';
import { Profile } from '../profile/profile';

@Component({
  selector: 'upw-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent implements OnInit {

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
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    const listName = this.cookiesService.get('current-list');
    if (listName) {
      this.currentList = this.listService.getList(listName).pipe(
        share()
      );
    }
  }

  private setMeta(profile: Profile) {
    this.title.setTitle(profile.name);
    this.meta.updateTag({
      property: 'og:title',
      content: profile.name
    });
    this.meta.updateTag({
      name: 'description',
      content: profile.bio
    });
    this.meta.updateTag({
      property: 'og:description',
      content: profile.bio
    });
    this.meta.updateTag({
      property: 'og:image',
      content: profile.image
    });
    this.meta.updateTag({
      property: 'og:url',
      content: `https://ng-atlanta-upw.firebaseapp.com/profile/${profile.id}`
    });
    this.meta.updateTag({
      property: 'og:type',
      content: `profile`
    });
    this.meta.updateTag({
      property: 'profile:username',
      content: profile.id
    });
  }

}
