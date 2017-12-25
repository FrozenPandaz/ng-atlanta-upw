import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from './profile/profile';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

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

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
