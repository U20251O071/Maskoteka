import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-pago-tarjeta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pago-tarjeta.html',
  styleUrl: './pago-tarjeta.css',
})
export class PagoTarjeta {
  card = '';
  name = '';
  exp = '';
  cvv = '';
  submitted = false;
  constructor(
    public data: DataService,
    private router: Router,
  ) {}
  pagar() {
    this.submitted = true;
    if (this.card && this.name && this.exp && this.cvv) {
      this.data.confirmReservation();
      this.router.navigate(['/pago-exitoso']);
    }
  }
}
