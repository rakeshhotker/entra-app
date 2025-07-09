import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';
import { RedirectComponent } from './redirect/redirect.component';

export const routes: Routes = [
    {
    path: '',
    component: HomeComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'redirect',
    component: RedirectComponent,
  },
];
