import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-reservar-cita',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reservar-cita.html',
  styleUrl: './reservar-cita.css',
})
export class ReservarCita {
  slots = ['09:00', '10:00', '11:00', '12:00', '14:00'];
  hour = '11:00';
  constructor(
    public data: DataService,
    private router: Router,
  ) {}
  confirmar() {
    this.data.setReservation({ hour: this.hour + ' am' });
    this.router.navigate(['/cita-confirmada']);
  }
}
