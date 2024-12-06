import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarCircleComponent } from '@psam/common-ui';
import { Profile } from '@psam/profile-data';

@Component({
  selector: 'lib-chat-workspace-header',
  standalone: true,
  imports: [AvatarCircleComponent, RouterLink],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>()
}
