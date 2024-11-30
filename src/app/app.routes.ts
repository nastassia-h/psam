import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { canActivateAuth, cannotActivateAuth, LoginPageComponent, RegisterPageComponent } from '@psam/auth';
import { SettingsPageComponent, ProfilePageComponent, SearchPageComponent, SubscribersPageComponent, SubscriptionsPageComponent } from '@psam/profile';
import { LayoutComponent } from '@psam/layout';
import { chatsRoutes } from '@psam/chat';
import { ProfileEffects, profileFeature } from '@psam/profile-data';

export const appRoutes: Route[] = [
   {
      path: '', 
      component: LayoutComponent, 
      providers: [
         provideState(profileFeature),
         provideEffects(ProfileEffects)
      ],
      children: [
         {path: '', redirectTo: 'profile/me', pathMatch: 'full'},
         {path: 'profile/:id', component: ProfilePageComponent},
         {path: 'settings', component: SettingsPageComponent},
         {path: 'search', component: SearchPageComponent},
         {path: 'subscribers', component: SubscribersPageComponent},
         {path: 'subscriptions', component: SubscriptionsPageComponent},
         {path: 'chats', loadChildren: () => chatsRoutes}
      ],
      canActivate: [canActivateAuth]
   },
   {path: 'login', component: LoginPageComponent, canActivate: [cannotActivateAuth]},
   {path: 'register', component: RegisterPageComponent, canActivate: [cannotActivateAuth]}
];
