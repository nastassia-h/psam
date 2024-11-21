import { Component, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '../../data/interfaces/post.interface';
import { Comment } from '../../data/interfaces/comment.interface';
import { CommentService, PostService } from '../../data';
import { firstValueFrom } from 'rxjs';
import { CommentComponent, MessageInputComponent } from '../../ui';
import { AvatarCircleComponent, DateDeltaPipe } from '@psam/common-ui';
import { selectMe } from '@psam/profile';

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
  likesCount = signal<number>(0);
  store = inject(Store);
  me = this.store.selectSignal(selectMe)
  commentService = inject(CommentService);
  postService = inject(PostService)

  isCommentsOpened = signal<boolean>(false);
  isPostLikedByMe = signal<boolean>(false);


  @Output() created = new EventEmitter<{data: {postId: number, text: string}}>()

  async ngOnInit() {
    await this.fetchPostComments();
    await this.fetchPostLikesCount();
    this.handlePostLike()
  }

  handlePostLike() {
    const postLikes = this.post()?.PostLikes;
    postLikes?.forEach(like => {
      if (like.AccountId === this.me()?.AccountId) {
        this.isPostLikedByMe.set(true);
        return;
      }
    })
  }

  handleCommentCreate(event: {data: string}) {
    firstValueFrom(this.commentService.createComment({
      Text: event.data,
      PostId: this.post()!.Id,
      ParentCommentId: null,
    })).then(() => this.fetchPostComments())
  }

  async fetchPostComments() {
    const comments = await firstValueFrom(this.commentService.getCommentsByPost(this.post()!.Id))
    this.comments.set(comments.reverse())
  }

  async fetchPostLikesCount() {
    const likes = await firstValueFrom(this.postService.fetchPostLikesCount(this.post()!.Id))
    this.likesCount.set(likes.likeCount)
  }

  toggleComments() {
    this.isCommentsOpened.set(!this.isCommentsOpened());
  }

  toggleLike() {
    if (!this.isPostLikedByMe()) {
      firstValueFrom(this.postService.createLike(this.post()!.Id))
        .then(() => {
          this.fetchPostLikesCount();
          this.isPostLikedByMe.set(!this.isPostLikedByMe())
        })
    } else {
      firstValueFrom(this.postService.deleteLike(this.post()!.Id))
        .then(() => {
          this.fetchPostLikesCount();
          this.isPostLikedByMe.set(!this.isPostLikedByMe())
        })
    }
  }
}
