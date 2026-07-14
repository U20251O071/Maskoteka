import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService, MascotaApi, Pet } from '../../core/data.service';
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
  idUsuario: any;
  showForm = false;
  editing?: MascotaApi; //Pet
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
      sterilized: false,
      microchip: '',
      notes: '',
    };
    this.showForm = true;
  }
  editar(p: any) {
    this.editing = p;
    console.log(p)
    this.draft = {
      idMascota: p.idMascota,
      name: p.nombre ?? '',
      birth: p.fechaNacimiento 
        ? p.fechaNacimiento.substring(0,10)
        : '',
      gender: p.sexo === 'M'
        ? 'Macho'
        : 'Hembra',
      species: p.idEspecie,
      breed: p.raza ?? '',
      weight: p.pesoKg ?? '',
      color: p.color ?? '',
      sterilized: p.esterilizado,
      microchip: p.microchip ?? '',
      notes: p.observaciones ?? ''
    };
    this.showForm = true;
  }
  /* guardar() {
    if (!this.draft.name) return;
    if (this.editing) this.data.updatePet(this.draft as Pet);
    else this.data.addPet(this.draft);
    this.showForm = false;
    this.toast = 'Mascota guardada correctamente';
    setTimeout(() => (this.toast = ''), 2000);
  } */

  guardar() {
    if (!this.draft.name?.trim()) {
      this.toast = 'Ingrese el nombre de la mascota';
      setTimeout(() => this.toast = '', 2500);
      return;
    }
  
    if (!this.draft.birth) {
      this.toast = 'Seleccione la fecha de nacimiento';
      setTimeout(() => this.toast = '', 2500);
      return;
    }
  
    const mascota = {
      idMascota: this.editing?.idMascota,
      nombre: this.draft.name,
      fechaNacimiento: this.draft.birth,
      sexo: this.draft.gender === 'Macho' ? 'M' : 'H',
      idEspecie: this.draft.species,
      raza: this.draft.breed,
      pesoKg: this.draft.weight,
      color: this.draft.color,
      esterilizado: this.draft.sterilized,
      microchip: this.draft.microchip,
      observaciones: this.draft.notes,
      idUsuario: this.idUsuario
    };
  
    if (this.editing) {
      console.log(mascota)
      this.__editar_mascota(mascota);
  
    } else {
  
      this.__registar_mascota(mascota);
  
    }
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

  __editar_mascota(data: any){
    this.ps.editar_mascota(data).subscribe({
      next: (rest: any) => {
        console.log(rest);
        // Ajusta esta condición según la respuesta de tu API
        if (rest.msg) {
          this.showForm = false;  
          this.toast = rest.msg || 'Mascota actualizada correctamente';
          this.__listar_mascotas_usuario(this.idUsuario);
          this.draft = {};
          this.editing = undefined;
        } else {
          this.toast = rest.msg || 'No se pudo actualizar la mascota';
        }
        setTimeout(() => this.toast = '', 2500);
      },
  
      error: (err) => {
        console.error(err);
        this.toast = 'Ocurrió un error al actualizar la mascota';
        setTimeout(() => this.toast = '', 2500);
      }
    });
  }

  especies = signal<any[]>([])
  __listar_especies(){
    this.ps.listar_especies().subscribe((rest: any) => {
      this.especies.set(rest.data);
      console.log(this.especies());
    });
  }

  __registar_mascota(data:any){
    /* this.ps.registar_mascota(data).subscribe((rest: any) => {
      console.log(rest.data)
    }) */
    data.idUsuario = this.idUsuario
    console.log("A:",data)
    this.ps.registar_mascota(data).subscribe({
      next: (rest: any) => {
        console.log(rest);
        if (rest.idMascota) {
          this.showForm = false;
          this.toast = rest.msg || 'Mascota registrada correctamente';
          const idUsuario = localStorage.getItem('idUsuario') || '1';
          this.__listar_mascotas_usuario(idUsuario);
          // limpiar el formulario
          this.draft = {};
        } else {
          this.toast = rest.msg || 'No se pudo registrar la mascota';
        }
        setTimeout(() => this.toast = '', 2500);
      },
      error: (err) => {
        console.error(err);
        this.toast = 'Ocurrió un error al registrar la mascota';
        setTimeout(() => this.toast = '', 2500);
      }
    });
  }

  ngOnInit(): void {
    this.__listar_especies()

    this.idUsuario =
    localStorage.getItem('idUsuario') || '1';
    this.__listar_mascotas_usuario(this.idUsuario);
    /* this.ar.params.subscribe((params: Params) => {
      this.__listar_mascotas_usuario(params['id']);
    }); */
  }
  

}
