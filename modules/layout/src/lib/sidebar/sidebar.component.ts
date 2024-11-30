import { AsyncPipe } from '@angular/common';
import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AvatarCircleComponent } from '@psam/common-ui';
import { profileActions, selectMe, selectSubscriptions, selectUnreadMsg } from '@psam/profile-data';
import { ProfileService } from '@psam/profile-data';
import { firstValueFrom, tap } from 'rxjs';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { ChatsService } from '@psam/chat';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [RouterLink, AsyncPipe, SubscriberCardComponent, AvatarCircleComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  chatsService = inject(ChatsService);
  store = inject(Store);
  subscribers$ = this.profileService.getSubscribersShortList(1, 3);
  me = this.store.selectSignal(selectMe)
  unreadMsg = this.store.selectSignal(selectUnreadMsg)
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
      label: 'Chats',
      link: 'chats'
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

    await firstValueFrom(this.profileService.getSubscriptions({})
      .pipe(
        tap(res => this.store.dispatch(profileActions.subscriptionsLoaded({profiles: res})))
      ))

    await firstValueFrom(this.profileService.getSubscribersShortList(1, 50)
    .pipe(
      tap(res => this.store.dispatch(profileActions.subscribersLoaded({profiles: res})))
    ))

    this.chatsService.connectWS();
  }

  openMenu() {
    this.isOpened = true;
    this.isClosed = false;
  }

  closeMenu() {
    this.isOpened = false;
    this.isClosed = true;
  }
}
