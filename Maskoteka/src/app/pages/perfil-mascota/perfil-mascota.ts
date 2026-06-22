import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService, Pet } from '../../core/data.service';

@Component({
  selector: 'app-perfil-mascota',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil-mascota.html',
  styleUrl: './perfil-mascota.css',
})
export class PerfilMascota {
  pet: Pet;
  tab = 'datos';
  constructor(
    private route: ActivatedRoute,
    public data: DataService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id') || 1);
    this.pet = this.data.getPet(id);
  }
}
