import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { profileActions, selectFilteredProfiles } from '@psam/profile-data';
import { Store } from '@ngrx/store';
import { ProfileCardComponent } from '../../ui';
import { InfiniteScrollTriggerComponent } from '@psam/common-ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { SidebarPortalComponent } from '@psam/common-ui';

@Component({
  selector: 'lib-search-page',
  standalone: true,
  imports: [SidebarPortalComponent, ProfileCardComponent, InfiniteScrollTriggerComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles)

  profilesLength = computed(() => this.profiles()?.length ?? 0)

  fetchNextPage() {
    this.store.dispatch(profileActions.setPage({}))
  }
}
