import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './features/public/landing/landing.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './features/public/login/login.component';
import { RegisterComponent } from './features/public/register/register.component';
import { SageAppComponent } from './sage-app/sage-app.component';
import { PublicComponent } from './features/public/public.component';
import { SplitterComponent } from './sage-app/splitter/splitter.component';
import { SettingsComponent } from './features/settings/settings.component';
import { ProfileComponent } from './features/settings/profile/profile.component';
import { AccountComponent } from './features/settings/account/account.component';
import { BlogComponent } from './features/public/blog/blog.component';
import { PrivacyComponent } from './features/public/privacy/privacy.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: LandingComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'login', component: LoginComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'app', // Parent route for the app
    component: SageAppComponent, // Layout component for the app (optional)
    children: [
      { path: '', redirectTo: 'splitter', pathMatch: 'full' },
      { path: 'splitter', component: SplitterComponent },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: ProfileComponent },
          { path: 'account', component: AccountComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
