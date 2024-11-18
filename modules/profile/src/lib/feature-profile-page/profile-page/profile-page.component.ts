import { Component, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfileService, selectSubscribers } from '../../data';
import { Store } from '@ngrx/store';
import {  switchMap } from 'rxjs';
import { selectMe } from '../../data';
import { AsyncPipe } from '@angular/common';
import { AvatarCircleComponent, ImgUrlPipe, SvgIconComponent } from '@psam/common-ui';
import { ProfileHeaderComponent } from "../../ui/profile-header/profile-header.component";
import { PostFeedComponent } from '@psam/post';

@Component({
  selector: 'lib-profile-page',
  standalone: true,
  imports: [AsyncPipe, SvgIconComponent, AvatarCircleComponent, RouterLink, ImgUrlPipe, ProfileHeaderComponent, PostFeedComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(Store);
  me = this.store.selectSignal(selectMe);
  subscribers = this.store.selectSignal(selectSubscribers);

  me$ = toObservable(this.store.selectSignal(selectMe));
  isMe = signal<boolean>(false);

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if (id === 'me') {
          this.isMe.set(true);
          return this.me$
        };

        this.isMe.set(false)
        return this.profileService.getAccount(id);
      })
    )
}

