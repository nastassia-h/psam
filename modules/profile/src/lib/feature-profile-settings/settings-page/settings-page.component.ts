import { Component, effect, inject, ViewChild } from '@angular/core';
import { AvatarUploadComponent } from "../../ui/avatar-upload/avatar-upload.component";
import { ProfileHeaderComponent, StackInputComponent } from '../../ui';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profile, ProfileService, selectMe } from '../../data';
import { Store } from '@ngrx/store';
import { toObservable } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'lib-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, ReactiveFormsModule, AvatarUploadComponent, StackInputComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  profileService = inject(ProfileService);
  store = inject(Store);
  me = this.store.selectSignal(selectMe)

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

  profile$ = toObservable(this.me);

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

  onSave() {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar))
    }

    const formValue: Partial<Profile> = this.form.getRawValue() as Partial<Profile>;

    firstValueFrom(this.profileService.patchProfile(formValue))
  }
}
