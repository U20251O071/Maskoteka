import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, Pet } from '../../core/data.service';

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendar.html',
  styleUrl: './agendar.css',
})
export class Agendar {
  selected?: Pet;
  service = 'Consulta especializada';
  submitted = false;
  constructor(
    public data: DataService,
    private router: Router,
  ) {}
  choose(p: Pet) {
    this.selected = p;
  }
  next() {
    this.submitted = true;
    if (this.selected) {
      this.data.setReservation({ pet: this.selected, service: this.service });
      this.router.navigate(['/agendar-calendario']);
    }
  }
}
