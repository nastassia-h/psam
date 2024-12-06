import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AvatarCircleComponent} from '@psam/common-ui';
import { Profile } from '@psam/profile-data';

@Component({
  selector: 'lib-subscriber-card',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriberCardComponent {
  @Input() profile!:Profile;
}
