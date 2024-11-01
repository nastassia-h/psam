import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../index';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginPayload } from '../../data/login.payload.interface';
import { PsamInputComponent } from '@psam/common-ui';

@Component({
  selector: 'lib-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, PsamInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router)

  isPasswordVisible = signal<boolean>(false)

  form = new FormGroup({
    username: new FormControl<string>(null!, Validators.required),
    password: new FormControl<string>(null!, Validators.required)
  })

  onSubmit(event: Event) {
    const formValue: LoginPayload = this.form.getRawValue() as LoginPayload;

    if (this.form.valid) {
      this.authService.login(formValue).subscribe(res => {
        this.router.navigate([''])
      })
    }
  }
}
