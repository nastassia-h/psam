import { Component, input } from '@angular/core';
import { MyChat } from '../../data';
import { DatePipe } from '@angular/common';
import { AvatarCircleComponent } from '@psam/common-ui';

@Component({
  selector: 'lib-chats-btn',
  standalone: true,
  imports: [DatePipe, AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss'
})
export class ChatsBtnComponent {
  chat = input<MyChat>()
}
