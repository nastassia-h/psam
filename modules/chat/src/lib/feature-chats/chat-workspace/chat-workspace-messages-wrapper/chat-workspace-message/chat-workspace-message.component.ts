import { DatePipe } from '@angular/common';
import { Component, HostBinding, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AvatarCircleComponent } from '@psam/common-ui';
import { selectMe } from '@psam/profile-data';
import { Message } from 'modules/chat/src/lib/data/interfaces/chat.interface';

@Component({
  selector: 'lib-chat-workspace-message',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss'
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
