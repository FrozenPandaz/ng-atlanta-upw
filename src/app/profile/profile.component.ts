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
      const profileLists = changes.profile.currentValue.lists;
      if (profileLists) {
        const currentList = profileLists.find(list => list.id === this.listId);
        this.list = currentList || null;
      } else {
        this.list = null;
      }
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
