import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService, Pet } from '../../core/data.service';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './mascotas.html',
  styleUrl: './mascotas.css',
})
export class Mascotas {
  showForm = false;
  editing?: Pet;
  toast = '';
  draft: any = {};
  constructor(public data: DataService) {}
  nuevo() {
    this.editing = undefined;
    this.draft = {
      name: '',
      age: '',
      gender: 'Hembra',
      species: 'Perro',
      breed: '',
      emoji: '🐶',
      weight: '',
      color: '',
      birth: '',
      sterilized: 'No',
      microchip: '',
      notes: '',
    };
    this.showForm = true;
  }
  editar(p: Pet) {
    this.editing = p;
    this.draft = { ...p };
    this.showForm = true;
  }
  guardar() {
    if (!this.draft.name) return;
    if (this.editing) this.data.updatePet(this.draft as Pet);
    else this.data.addPet(this.draft);
    this.showForm = false;
    this.toast = 'Mascota guardada correctamente';
    setTimeout(() => (this.toast = ''), 2000);
  }
  eliminar(id: number) {
    this.data.deletePet(id);
    this.toast = 'Mascota eliminada';
    setTimeout(() => (this.toast = ''), 2000);
  }
}
