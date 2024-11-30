import { AsyncPipe } from '@angular/common';
import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AvatarCircleComponent, ImgUrlPipe } from '@psam/common-ui';
import { profileActions, selectMe, selectSubscriptions } from '@psam/profile-data';
import { ProfileService } from '@psam/profile-data';
import { firstValueFrom, tap } from 'rxjs';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [RouterLink, AsyncPipe, ImgUrlPipe, SubscriberCardComponent, AvatarCircleComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  store = inject(Store);
  subscribers$ = this.profileService.getSubscribersShortList(1, 3);
  me = this.store.selectSignal(selectMe)
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

    await firstValueFrom(this.profileService.getSubscriptions({})
      .pipe(
        tap(res => this.store.dispatch(profileActions.subscriptionsLoaded({profiles: res})))
      ))

    await firstValueFrom(this.profileService.getSubscribersShortList(1, 50)
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
}
