import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService, Pet } from '../../core/data.service';
import { ProjectService } from '../../services/project-service';
import { EdadPipe } from '../../core/pipes/edad-pipe';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, EdadPipe],
  templateUrl: './mascotas.html',
  styleUrl: './mascotas.css',
})
export class Mascotas {
  showForm = false;
  editing?: Pet;
  toast = '';
  draft: any = {};
  constructor(
    public data: DataService,
    private readonly ps: ProjectService,
  ) {}

  __obtener_detalle_mascota(idMascota: string, idUsuario: string){
    this.ps.obtener_detalle_mascota({idMascota, idUsuario }).subscribe((rest: any) => {
      this.mascotas.set(rest.data);
      console.log('mascota:', rest.data);
    });
  }

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

  mascotas = signal<any[]>([]);
  __listar_mascotas_usuario(id: string){
    this.ps.listar_mascotas_usuario(id).subscribe((rest: any) => {
      this.mascotas.set(rest.data);
      console.log('mascotas data:', rest.data);
    });
  }

  ngOnInit(): void {
    const idUsuario =
    localStorage.getItem('idUsuario') || '1';
    this.__listar_mascotas_usuario(idUsuario);
    /* this.ar.params.subscribe((params: Params) => {
      this.__listar_mascotas_usuario(params['id']);
    }); */
  }

}
