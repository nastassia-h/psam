import { Component, input } from '@angular/core';
import { ImgUrlPipe } from '@psam/common-ui';

@Component({
  selector: 'lib-avatar-upload',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  avatarUrl = input<string | null>();
}
