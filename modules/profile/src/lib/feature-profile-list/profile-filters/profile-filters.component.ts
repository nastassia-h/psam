import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, startWith, Subscription } from 'rxjs';
import { profileActions, selectProfileFilters } from '@psam/profile-data'
import { StackInputComponent } from '../../ui';

@Component({
  selector: 'lib-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule, StackInputComponent],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder);
  store = inject(Store);

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [[] as string[]]
  })

  searchFormSub!: Subscription

  constructor() {
    this.searchFormSub = this.form.valueChanges.pipe(
      startWith({}),
      debounceTime(300),
    )
    .subscribe(formValue => {
      this.store.dispatch(profileActions.filterEvents({filters: formValue}))
    })

    const filters = this.store.selectSignal(selectProfileFilters);
    this.form.patchValue(filters());
  }

  ngOnDestroy(): void {
      this.searchFormSub.unsubscribe()
  }
}
