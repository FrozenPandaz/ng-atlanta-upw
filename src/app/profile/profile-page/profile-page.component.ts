import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators/pluck';
import { tap } from 'rxjs/operators/tap';

import { CookiesService } from '../../shared/cookies/cookies.service';
import { OpenGraphService } from '../../shared/meta/open-graph/open-graph.service';
import { TwitterCardService } from '../../shared/meta/twitter-card/twitter-card.service';
import { ProfileComponent } from '../profile.component';
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

  public list: string;

  @ViewChild('profilePage', {
    read: ElementRef
  })
  profilePage: ElementRef;

  @ViewChild('profilePage', {
    read: ProfileComponent
  })
  profileComponent: ProfileComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cookiesService: CookiesService,
    private openGraphService: OpenGraphService,
    private twitterCardService: TwitterCardService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.list = this.cookiesService.get('current-list');
  }

  private setMeta(profile: Profile) {
    this.title.setTitle(profile.name);
    this.meta.updateTag({
      name: 'description',
      content: profile.bio
    });
    this.twitterCardService.updateMeta({
      card: 'summary_large_image',
      title: profile.name,
      image: profile.image,
      description: profile.bio
    });
    this.openGraphService.updateMeta({
      type: 'profile',
      title: profile.name,
      url: `https://ng-atlanta-upw.firebaseapp.com/profile/${profile.id}`,
      description: profile.bio,
      image: profile.image,
      username: profile.id
    });
  }
}
