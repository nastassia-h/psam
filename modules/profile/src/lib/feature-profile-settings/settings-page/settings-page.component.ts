import { ChangeDetectionStrategy, Component, effect, inject, ViewChild } from '@angular/core';
import { AvatarUploadComponent } from "../../ui/avatar-upload/avatar-upload.component";
import { ProfileHeaderComponent, StackInputComponent } from '../../ui';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profile, ProfileService, selectMe } from '@psam/profile-data';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'lib-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, ReactiveFormsModule, AvatarUploadComponent, StackInputComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  profileService = inject(ProfileService);
  store = inject(Store);
  me = this.store.selectSignal(selectMe)

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

  fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: [[] as string[]],
    city: ['', Validators.required]
  })

  constructor() {
    effect(() => {
      const profile = this.me();
      if (profile) {
        this.form.patchValue(profile)
      }
    })
  }

  async onSave() {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return;

    const formValue: Partial<Profile> = this.form.getRawValue() as Partial<Profile>;

    if (this.avatarUploader.avatar) {
      const profile = await firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar))
      if (profile.avatarUrl) {
        formValue.avatarUrl = profile.avatarUrl + Date.now();
      }
    }

    firstValueFrom(this.profileService.patchProfile(formValue))
  }
}
