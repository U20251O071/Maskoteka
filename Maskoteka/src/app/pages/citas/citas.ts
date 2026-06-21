import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService, Appointment } from '../../core/data.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './citas.html',
  styleUrl: './citas.css',
})
export class Citas {
  filtro: 'proximas' | 'pasadas' | 'todas' = 'todas';
  selected?: Appointment;
  toast = '';
  constructor(public data: DataService) {}
  get citas() {
    const all = this.data.getAppointments();
    if (this.filtro === 'proximas') return all.filter((c) => c.status !== 'Completada');
    if (this.filtro === 'pasadas') return all.filter((c) => c.status === 'Completada');
    return all;
  }
  ver(c: Appointment) {
    this.selected = c;
  }
  editar(c: Appointment) {
    this.toast = 'Modo edición activado para ' + c.pet;
    setTimeout(() => (this.toast = ''), 2000);
  }
  eliminar(id: number) {
    this.data.deleteAppointment(id);
    this.toast = 'Cita eliminada correctamente';
    setTimeout(() => (this.toast = ''), 2000);
  }
}
