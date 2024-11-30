import { Component, inject } from '@angular/core';
import { ProfileService, selectSubscribers } from '@psam/profile-data';
import { Store } from '@ngrx/store';
import { ProfileCardComponent } from '../../ui';
import { InfiniteScrollTriggerComponent } from '@psam/common-ui';

@Component({
  selector: 'lib-subscribers-page',
  standalone: true,
  imports: [ProfileCardComponent, InfiniteScrollTriggerComponent],
  templateUrl: './subscribers-page.component.html',
  styleUrl: './subscribers-page.component.scss'
})
export class SubscribersPageComponent {
  profileService = inject(ProfileService);
  store = inject(Store);
  subscribers = this.store.selectSignal(selectSubscribers)

  fetchNextPage() {
    // :TODO 
  }
}
