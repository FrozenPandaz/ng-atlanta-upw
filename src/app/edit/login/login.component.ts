import { Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'upw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public isNode = isPlatformServer(this.platformId);

  public currentUser = this.isNode ? null : this.auth.authState;

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
