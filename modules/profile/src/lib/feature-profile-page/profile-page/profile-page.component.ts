import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../data';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { selectMe } from '../../data';
import { AsyncPipe } from '@angular/common';
import { ImgUrlPipe, SvgIconComponent } from '@psam/common-ui';
import { ProfileHeaderComponent } from "../../ui/profile-header/profile-header.component";

@Component({
  selector: 'lib-profile-page',
  standalone: true,
  imports: [AsyncPipe, SvgIconComponent, RouterLink, ImgUrlPipe, ProfileHeaderComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(Store);

  me$ = toObservable(this.store.selectSignal(selectMe));
  subscribers$ = this.profileService.getSubscribersShortList(1, 5);

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

