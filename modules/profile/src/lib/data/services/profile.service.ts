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
  baseApiUrl = 'http://localhost:5269/'

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}GetMe`)
      .pipe(
        tap(res => this.store.dispatch(profileActions.setMe({profile: res})))
      )
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}${id}`);
  }

  removeTechnology(id: number) {
    return this.http.delete(`${this.baseApiUrl}RemoveTechnologies/${id}`)
  }

  addTechnology(technology: string) {
    return this.http.post(`${this.baseApiUrl}AddTechnologies`, {technology})
  }

  getSubscribersShortList(id: number | null, params: Record<string, any>) {
    return this.http.get<Profile[]>(`${this.baseApiUrl}GetAccountsSubscribers/${id}`, {params})
  }

  getSubscriptions(id: number | null, params: Record<string, any>) {
    return this.http.get<Profile[]>(`${this.baseApiUrl}GetAccountsSubscriptions/${id}/`, {params})
  }

  subscribe(id: number) {
    return this.http.post<string>(`${this.baseApiUrl}Subscribe/${id}`, {})
  }

  unsubscribe(id: number) {
    return this.http.delete<string>(`${this.baseApiUrl}Subscribe/${id}`)
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}UpdateMe`, profile)
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
    return this.http.get<Profile[]>(`${this.baseApiUrl}GetAccounts`, {params})
  }
}
