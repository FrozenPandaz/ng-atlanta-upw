import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Profile } from './profile/profile';
import { List } from '../lander/list/list';

@Component({
  selector: 'upw-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  @Input()
  profile: Profile;

  @Input()
  list: List;

  getMember(direction: 'next'|'previous') {
    const offset = direction === 'next' ? 1 : -1;
    const rank = this.getIndex();
    return this.list.members[rank + offset];
  }

  getIndex(): number {
    return this.list.members.findIndex(item => item.profile.id === this.profile.id);
  }

  getRank(): number {
    return this.getIndex() + 1;
  }
}
