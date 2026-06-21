import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-agendar-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendar-calendario.html',
  styleUrl: './agendar-calendario.css',
})
export class AgendarCalendario {
  days = Array.from({ length: 35 }, (_, i) => (i < 2 ? 26 + i : i - 1));
  busy = [7, 15, 24, 28];
  selected = 24;
  slots = ['09:00', '10:00', '11:00', '12:00', '14:00'];
  hour = '11:00 am';
  constructor(
    public data: DataService,
    private router: Router,
  ) {}
  selectDay(d: number) {
    if (!this.busy.includes(d)) {
      this.selected = d;
      this.data.setReservation({ date: 'Lunes, 24 de noviembre de 2025' });
    }
  }
  selectSlot(s: string) {
    this.hour = s.replace(':00', ':00 am');
    this.data.setReservation({ hour: this.hour });
  }
  next() {
    this.router.navigate(['/reservar-cita']);
  }
}
