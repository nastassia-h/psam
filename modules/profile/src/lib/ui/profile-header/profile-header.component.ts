import { Component, input } from '@angular/core';
import { AvatarUploadComponent } from "../avatar-upload/avatar-upload.component";
import { Profile } from '../../data/index';

@Component({
  selector: 'lib-profile-header',
  standalone: true,
  imports: [AvatarUploadComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile = input<Profile | null>();
}
