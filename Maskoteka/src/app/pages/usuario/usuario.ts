import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {
  current = '';
  next = '';
  confirm = '';
  toast = '';
  editing = false;
  user = {
    name: 'Victor S.',
    email: 'victor.saravia@gmail.com',
    phone: 'No especifica',
    since: 'Jun, 01 2025',
  };
  update() {
    if (this.current && this.next && this.next === this.confirm) {
      this.toast = 'Contraseña actualizada correctamente';
      this.current = this.next = this.confirm = '';
      setTimeout(() => (this.toast = ''), 2200);
    } else {
      this.toast = 'Revisa los campos de contraseña';
      setTimeout(() => (this.toast = ''), 2200);
    }
  }
}
