import { Component, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '../../data/interfaces/post.interface';
import { Comment } from '../../data/interfaces/comment.interface';
import { CommentService } from '../../data';
import { ProfileService, selectMe } from '@psam/profile';
import { firstValueFrom } from 'rxjs';
import { CommentComponent, MessageInputComponent } from '../../ui';
import { AvatarCircleComponent, DateDeltaPipe } from '@psam/common-ui';

@Component({
  selector: 'lib-post',
  standalone: true,
  imports: [CommentComponent, MessageInputComponent, AvatarCircleComponent, DateDeltaPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  post = input<Post>();
  comments = signal<Comment[]>([]); 
  store = inject(Store);
  commentService = inject(CommentService);
  profileService = inject(ProfileService);

  me = this.store.selectSignal(selectMe);
  isCommentsOpened = signal<boolean>(false);


  @Output() created = new EventEmitter<{data: {postId: number, text: string}}>()

  ngOnInit() {
    this.comments.set(this.post()!.comments)   
  }

  handleCommentCreate(event: {data: string}) {
    firstValueFrom(this.commentService.createComment({
      text: event.data,
      authorId: this.me()!.id,
      postId: this.post()!.id,
      commentId: null,
    })).then(() => this.fetchPostComments())
  }

  async fetchPostComments() {
    const comments = await firstValueFrom(this.commentService.getCommentsByPost(this.post()!.id))
    this.comments.set(comments)
  }

  toggleComments() {
    this.isCommentsOpened.set(!this.isCommentsOpened());
  }
}
