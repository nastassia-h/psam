import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginPayload } from '../data/login.payload.interface';
import { Store } from '@ngrx/store';
import { profileActions } from '@psam/profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);
  store = inject(Store);

  baseApiUrl = 'http://localhost:5269/'

  token: string|null = null;
  refreshToken: string|null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  saveTokens(res: TokenResponse) {
    this.token = res.Jwt;

    this.cookieService.set('token', this.token)
  }

  login(payload: LoginPayload) {
    return this.http.post<TokenResponse>(`${this.baseApiUrl}api/Auth/Login`, payload)
      .pipe(
        tap(val => {
          this.saveTokens(val)
        })
      );
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.store.dispatch(profileActions.setMe({profile: null}))
    window.location.href = '/login';
    //this.router.navigate(['/login']);
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}refresh`,
      {
        refresh_token: this.refreshToken,
      }
    ).pipe(
      tap(val => {
        this.saveTokens(val)
      }),
      catchError(error => {
        this.logout();
        return throwError(error)
      })
    )
  }
}
