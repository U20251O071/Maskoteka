import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthenticatedLayout } from './core/authenticated-layout';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthenticatedLayout,
    children: [{ path: 'dashboard', component: Dashboard }],
  },
  { path: '**', redirectTo: 'login' },
];
