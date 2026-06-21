import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-pago-exitoso',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pago-exitoso.html',
  styleUrl: './pago-exitoso.css',
})
export class PagoExitoso {
  constructor(public data: DataService) {}
}
