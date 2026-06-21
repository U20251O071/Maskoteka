import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { PagoTarjeta } from './pages/pago-tarjeta/pago-tarjeta';
import { PagoExitoso } from './pages/pago-exitoso/pago-exitoso';
import { AuthenticatedLayout } from './core/authenticated-layout';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthenticatedLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'pago-tarjeta', component: PagoTarjeta },
      { path: 'pago-exitoso', component: PagoExitoso },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
