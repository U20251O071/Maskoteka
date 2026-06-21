import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-cita-confirmada',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cita-confirmada.html',
  styleUrl: './cita-confirmada.css',
})
export class CitaConfirmada {
  constructor(public data: DataService) {}
}
