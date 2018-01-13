import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map } from 'rxjs/operators/map';
import { pluck } from 'rxjs/operators/pluck';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { tap } from 'rxjs/operators/tap';

import { CookiesService } from '../../shared/cookies/cookies.service';
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
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.list = this.cookiesService.get('current-list');
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

  public mouseDown(event: MouseEvent) {
    const initialX = event.pageX;
    const nativeElement: HTMLElement = this.profilePage.nativeElement;
    let diff = 0;
    nativeElement.style['will-change'] = 'translate';
    fromEvent(nativeElement, 'mousemove').pipe(
      takeUntil(fromEvent(nativeElement, 'mouseup')),
      map((e: MouseEvent) => e.pageX),
      map(newX => newX - initialX),
    )
      .subscribe(diffX => {
        diff = diffX;
        nativeElement.style.transform = `translateX(${diffX}px)`;
        nativeElement.style.transition = `translate 20ms`;
      }, null, () => {
        nativeElement.style.transform = '';
        if (Math.abs(diff) > 100) {
          requestAnimationFrame(() => {
            this.profileComponent.navigate(diff < 0 ? 'next' : 'previous');
          });
        }
    });
  }
}
