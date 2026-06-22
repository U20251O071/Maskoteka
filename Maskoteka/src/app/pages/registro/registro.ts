import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  nombre = '';
  apellidos = '';
  email = '';
  password = '';
  acepta = false;
  submitted = false;
  constructor(private router: Router) {}
  registrar() {
    this.submitted = true;
    if (this.nombre && this.apellidos && this.email && this.password && this.acepta)
      this.router.navigate(['/dashboard']);
  }
}
