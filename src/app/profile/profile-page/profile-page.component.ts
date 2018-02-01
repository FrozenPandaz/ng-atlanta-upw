import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators/pluck';
import { tap } from 'rxjs/operators/tap';

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
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    // this.list = this.cookiesService.get('current-list');
  }

  private setMeta(profile: Profile) {
    this.title.setTitle(profile.name);
    this.meta.updateTag({
      name: 'description',
      content: profile.bio
    });
  }
}
