import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RegisterPayload } from '../../data/register.payload.interface';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PsamInputComponent } from '@psam/common-ui';

@Component({
  selector: 'lib-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, PsamInputComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false)
  isPasswordConfirmVisible = signal<boolean>(false)

  form = new FormGroup({
    firstname: new FormControl<string>('', Validators.required),
    lastname: new FormControl<string>('', Validators.required),
    username: new FormControl<string>('', Validators.required),
    city: new FormControl<string>(''),
    password: new FormControl<string>('', Validators.required),
    passwordConfirm: new FormControl<string>('', Validators.required)
  })

  onSubmit(event: Event) {
    const formValue: RegisterPayload = this.form.getRawValue() as RegisterPayload;

    if (this.form.valid) {
      // this.authService.register(formValue).subscribe(res => {
      //   this.router.navigate([''])
      // })
    }
  }
}
