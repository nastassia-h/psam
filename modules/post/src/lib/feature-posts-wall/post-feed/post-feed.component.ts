import { AfterViewInit, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { CommentService, PostService } from '../../data';
import { Store } from '@ngrx/store';
import { auditTime, firstValueFrom, fromEvent } from 'rxjs';
import { MessageInputComponent } from '../../ui';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'lib-post-feed',
  standalone: true,
  imports: [MessageInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent implements AfterViewInit {
  postService = inject(PostService)
  commentService = inject(CommentService)
  store = inject(Store)
  r2 = inject(Renderer2)
  feed = this.postService.posts

  hostElement = inject(ElementRef)

  constructor() {
    console.log('sdh')
    firstValueFrom(this.postService.fetchPosts())

    fromEvent(window, 'resize')
      .pipe(
        auditTime(500)
      )
      .subscribe(() => this.adjustHostHeight())
  }

  ngAfterViewInit() {
    this.adjustHostHeight()
  }

  adjustHostHeight() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    let height = window.innerHeight - top - 24 - 24;
    height = (window.innerWidth < 1200) ? height + top : height
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  handlePostCreated(event: { data: string }) {
    firstValueFrom(this.postService.createPost({
      Title: 'Test',
      Content: event.data
    }))
  }
}
