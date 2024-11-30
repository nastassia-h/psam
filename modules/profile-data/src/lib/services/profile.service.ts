import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { map, tap } from 'rxjs';
import { profileActions } from '../store';
import { Pageble } from '@psam/data';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  store = inject(Store);
  baseApiUrl = 'https://icherniakov.ru/yt-course/account/'

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}me`)
      .pipe(
        tap(res => this.store.dispatch(profileActions.setMe({profile: res})))
      )
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}${id}`);
  }

  getSubscribersShortList(page: number, size: number) {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}subscribers/?page=${page}&size=${size}`)
      .pipe(
        map(res => res.items)
      );
  }

  getSubscriptions(params: Record<string, any>) {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}subscriptions/`, {params})
      .pipe(
        map(res => res.items)
      );
  }

  subscribe(id: number) {
    return this.http.post<string>(`${this.baseApiUrl}subscribe/${id}`, {})
  }

  unsubscribe(id: number) {
    return this.http.delete<string>(`${this.baseApiUrl}subscribe/${id}`, {})
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}me`, profile)
      .pipe(
        tap(res => this.store.dispatch(profileActions.setMe({profile: res})))
      )
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file)
    return this.http.post<Profile>(`${this.baseApiUrl}upload_image`, fd)
  }

  filterAccounts(params: Record<string, any>) {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}accounts`, {params})
  }
}
