import { Component, Input } from '@angular/core';
import { AvatarCircleComponent, ImgUrlPipe } from '@psam/common-ui';
import { Profile } from '@psam/profile';

@Component({
  selector: 'lib-subscriber-card',
  standalone: true,
  imports: [ImgUrlPipe, AvatarCircleComponent],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss'
})
export class SubscriberCardComponent {
  @Input() profile!:Profile;
}
