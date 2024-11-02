import { Component, inject } from '@angular/core';
import { ProfileService, selectSubscriptions } from '../../data';
import { Store } from '@ngrx/store';
import { ProfileCardComponent } from '../../ui';
import { InfiniteScrollTriggerComponent } from '@psam/common-ui';

@Component({
  selector: 'lib-subscriptions-page',
  standalone: true,
  imports: [ProfileCardComponent, InfiniteScrollTriggerComponent],
  templateUrl: './subscriptions-page.component.html',
  styleUrl: './subscriptions-page.component.scss'
})
export class SubscriptionsPageComponent {
  profileService = inject(ProfileService);
  store = inject(Store);
  subscriptions = this.store.selectSignal(selectSubscriptions)

  fetchNextPage() {
    // :TODO
  }
}
