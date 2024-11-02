import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@psam/common-ui';
import { Comment } from '../../data/interfaces/comment.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'lib-comment',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = input<Comment>();
}
