import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-resumen-cita',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resumen-cita.html',
  styleUrl: './resumen-cita.css',
})
export class ResumenCita {
  constructor(public data: DataService) {}
}
