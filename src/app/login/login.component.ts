import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { share } from 'rxjs/operators/share';
import { tap } from 'rxjs/operators/tap';

@Component({
  selector: 'upw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public ready = false;

  public isNode = isPlatformServer(this.platformId);

  public currentUser = this.isNode ? null : this.auth.authState.pipe(
    tap(() => {
      this.ready = true;
    }),
    share()
  );

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  login() {
    this.auth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  logout() {
    this.auth.auth.signOut();
  }

}
