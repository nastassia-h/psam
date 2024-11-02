import { Component, input } from '@angular/core';
import { Profile } from '../../data/index';
import { AvatarCircleComponent } from '@psam/common-ui';

@Component({
  selector: 'lib-profile-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile = input<Profile | null>();
}
