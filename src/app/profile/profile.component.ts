import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Router } from '@angular/router';
import { ListData, Profile } from './profile/profile';

@Component({
  selector: 'upw-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnChanges {

  @Input()
  profile: Profile;

  @Input()
  listId: string;

  list: ListData;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.profile) {
      this.list = changes.profile.currentValue.lists.find(list => list.id === this.listId);
    }
  }

  getMember(direction: 'next' | 'previous') {
    return this.list.memberData[direction];
  }

  getRank(): number {
    return this.list.memberData.rank;
  }

  navigate(direction: 'next' | 'previous') {
    const member = this.getMember(direction);
    this.router.navigate(['/profile', member.id]);
  }
}
