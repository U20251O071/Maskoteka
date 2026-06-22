import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  submitted = false;
  constructor(private router: Router) {}
  ingresar() {
    this.submitted = true;
    if (this.email && this.password) this.router.navigate(['/dashboard']);
  }
}
