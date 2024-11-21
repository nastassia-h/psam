import { AfterViewInit, Component, ElementRef, inject, Renderer2, signal } from '@angular/core';
import { CommentService, PostService } from '../../data';
import { Store } from '@ngrx/store';
import { auditTime, firstValueFrom, fromEvent, switchMap } from 'rxjs';
import { MessageInputComponent } from '../../ui';
import { PostComponent } from '../post/post.component';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { selectMe } from '@psam/profile';

@Component({
  selector: 'lib-post-feed',
  standalone: true,
  imports: [MessageInputComponent, PostComponent, AsyncPipe],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent implements AfterViewInit {
  postService = inject(PostService)
  commentService = inject(CommentService)
  route = inject(ActivatedRoute);
  store = inject(Store)
  me = this.store.selectSignal(selectMe)
  r2 = inject(Renderer2)
  //feed = this.postService.posts
  isMe = signal<boolean>(false);

  hostElement = inject(ElementRef)

  constructor() {
    //firstValueFrom(this.postService.fetchPosts())

    fromEvent(window, 'resize')
      .pipe(
        auditTime(500)
      )
      .subscribe(() => this.adjustHostHeight())
  }

  feed$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        this.isMe.set(id === 'me');
        const accountId = id === 'me' ? this.me()!.AccountId : id
        return this.postService.fetchPostsByAccountId(accountId);
      })
  )

  ngAfterViewInit() {
    this.adjustHostHeight()
  }

  adjustHostHeight() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  handlePostCreated(event: { data: string }) {
    firstValueFrom(this.postService.createPost({
      Title: 'Test',
      Content: event.data
    }))
    this.feed$ = this.postService.fetchPosts();
  }
}
