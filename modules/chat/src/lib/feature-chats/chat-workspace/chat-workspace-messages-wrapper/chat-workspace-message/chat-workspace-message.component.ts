import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AvatarCircleComponent } from '@psam/common-ui';
import { selectMe } from '@psam/profile-data';
import { Message } from '../../../../data';

@Component({
  selector: 'lib-chat-workspace-message',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();
  store = inject(Store);
  me = this.store.selectSignal(selectMe);

  @HostBinding('class.right')
  get right() {
    return this.message().isMine
  }
}
