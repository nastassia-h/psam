import { AsyncPipe } from '@angular/common';
import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AvatarCircleComponent, ImgUrlPipe } from '@psam/common-ui';
import { profileActions, selectMe, selectSubscribers, selectSubscriptions } from '@psam/profile';
import { ProfileService } from '@psam/profile';
import { firstValueFrom, tap } from 'rxjs';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { AuthService } from '@psam/auth';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [RouterLink, AsyncPipe, ImgUrlPipe, SubscriberCardComponent, AvatarCircleComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  authService = inject(AuthService);
  store = inject(Store);
  me = this.store.selectSignal(selectMe)
  subscribers = this.store.selectSignal(selectSubscribers);
  subscriptions = this.store.selectSignal(selectSubscriptions)

  @HostBinding('class.open')
  isOpened = false
  @HostBinding('class.close')
  isClosed = false

  menu = [
    {
      label: 'Home',
      link: 'profile/me'
    },
    {
      label: 'Search',
      link: 'search'
    },
    {
      label: 'Subscriptions',
      link: 'subscriptions'
    }
  ]

  async ngOnInit() {
    await firstValueFrom(this.profileService.getMe())

    await firstValueFrom(this.profileService.getSubscriptions(this.me()?.AccountId ?? null, {})
    .pipe(
      tap(res => this.store.dispatch(profileActions.subscriptionsLoaded({profiles: res})))
    ))


    await firstValueFrom(this.profileService.getSubscribersShortList(this.me()?.AccountId ?? null, {})
    .pipe(
      tap(res => this.store.dispatch(profileActions.subscribersLoaded({profiles: res})))
    ))

  }

  openMenu() {
    this.isOpened = true;
    this.isClosed = false;
  }

  closeMenu() {
    this.isOpened = false;
    this.isClosed = true;
  }

  logout() {
    this.authService.logout();
  }
}
