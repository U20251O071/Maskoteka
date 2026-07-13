import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService, MascotaApi, Pet } from '../../core/data.service';
import { ProjectService } from '../../services/project-service';

@Component({
  selector: 'app-agendar',
  imports: [CommonModule, FormsModule],
  templateUrl: './agendar.html',
  styleUrl: './agendar.css',
})
export class Agendar {
  selected?: MascotaApi;
  service = 'Consulta especializada';
  submitted = false;
  constructor(
    public data: DataService,
    private router: Router,
    private readonly ps: ProjectService,
    private readonly ar: ActivatedRoute,
  ) {}

  choose(p: MascotaApi) {
    this.selected = p;
    console.log(p);
    console.log(this.selected);
  }

  user = signal<any[]>([]);
  mascotas = signal<any[]>([]);

  __listar_mascotas_usuario(id: string){
    this.ps.listar_mascotas_usuario(id).subscribe((rest: any) => {
      this.mascotas.set(rest.data);
      console.log('mascotas data:', rest.data);
    });
  }

  next() {
    this.submitted = true;
    if (this.selected) {
      // this.data.setReservation({ pet: this.selected, service: this.service });
      this.router.navigate(['/agendar-calendario']);
    }
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
