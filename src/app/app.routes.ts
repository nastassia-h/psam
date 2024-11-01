import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { canActivateAuth, cannotActivateAuth, LoginPageComponent, RegisterPageComponent } from '@psam/auth';
import { ProfileEffects, profileFeature } from '@psam/profile';
import { LayoutComponent } from '@psam/layout';
import { ProfilePageComponent } from '@psam/profile';

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
      ],
   canActivate: [canActivateAuth]
   },
   {path: 'login', component: LoginPageComponent, canActivate: [cannotActivateAuth]},
   {path: 'register', component: RegisterPageComponent, canActivate: [cannotActivateAuth]}
];
