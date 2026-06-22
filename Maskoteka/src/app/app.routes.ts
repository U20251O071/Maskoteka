import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { ResumenCita } from './pages/resumen-cita/resumen-cita';
import { PagoTarjeta } from './pages/pago-tarjeta/pago-tarjeta';
import { PagoExitoso } from './pages/pago-exitoso/pago-exitoso';
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
      { path: 'pago-exitoso', component: PagoExitoso },
      { path: 'resumen-cita', component: ResumenCita },
      { path: 'agendar', component: Agendar },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
