import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { profileActions, selectFilteredProfiles } from '@psam/profile-data';
import { Store } from '@ngrx/store';
import { ProfileCardComponent } from '../../ui';
import { InfiniteScrollTriggerComponent } from '@psam/common-ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';

@Component({
  selector: 'lib-search-page',
  standalone: true,
  imports: [ProfileCardComponent, InfiniteScrollTriggerComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles)

  fetchNextPage() {
    this.store.dispatch(profileActions.setPage({}))
  }
}
