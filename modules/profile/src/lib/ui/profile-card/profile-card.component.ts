import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Profile, profileActions } from '@psam/profile-data';
import { RouterLink } from '@angular/router';
import { AvatarCircleComponent, ImgUrlPipe } from '@psam/common-ui';

@Component({
  selector: 'lib-profile-card',
  standalone: true,
  imports: [RouterLink, ImgUrlPipe, AvatarCircleComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {
  store = inject(Store)
  @Input() profile!: Profile;

  subscribe(profile: Profile) {
    this.store.dispatch(profileActions.subscribe({profile}))
  }

  unsubscribe(id: number) {
    this.store.dispatch(profileActions.unsubscribe({id}))
  }
}
