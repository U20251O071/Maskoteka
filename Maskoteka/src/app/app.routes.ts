import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { PagoTarjeta } from './pages/pago-tarjeta/pago-tarjeta';
import { AuthenticatedLayout } from './core/authenticated-layout';
import { Agendar } from './pages/agendar/agendar';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthenticatedLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'pago-tarjeta', component: PagoTarjeta },
      { path: 'agendar', component: Agendar },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
