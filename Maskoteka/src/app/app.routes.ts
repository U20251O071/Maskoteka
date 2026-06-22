import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { Dashboard } from './pages/dashboard/dashboard';
import { Citas } from './pages/citas/citas';
import { Agendar } from './pages/agendar/agendar';
import { AgendarCalendario } from './pages/agendar-calendario/agendar-calendario';
import { ReservarCita } from './pages/reservar-cita/reservar-cita';
import { CitaConfirmada } from './pages/cita-confirmada/cita-confirmada';
import { ResumenCita } from './pages/resumen-cita/resumen-cita';
import { PagoTarjeta } from './pages/pago-tarjeta/pago-tarjeta';
import { PagoExitoso } from './pages/pago-exitoso/pago-exitoso';
import { Usuario } from './pages/usuario/usuario';
import { AuthenticatedLayout } from './core/authenticated-layout';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  {
    path: '',
    component: AuthenticatedLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'citas', component: Citas },
      { path: 'agendar', component: Agendar },
      { path: 'agendar-calendario', component: AgendarCalendario },
      { path: 'reservar-cita', component: ReservarCita },
      { path: 'cita-confirmada', component: CitaConfirmada },
      { path: 'resumen-cita', component: ResumenCita },
      { path: 'pago-tarjeta', component: PagoTarjeta },
      { path: 'pago-exitoso', component: PagoExitoso },
      { path: 'usuario', component: Usuario },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
