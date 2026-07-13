import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  resumen = signal<any>({
    totalMascotas: 0,
    citasProximas: 0,
    citasCompletadas: 0,
  });

  proximasCitas = signal<any[]>([]);

  constructor(
    private readonly ps: ProjectService
  ) {}

  __obtener_dashboard(id: string) {
    this.ps.obtener_dashboard(id).subscribe({
      next: (rest: any) => {
        this.resumen.set(rest.data.resumen);
        this.proximasCitas.set(rest.data.proximasCitas);

        console.log('Resumen dashboard:', rest.data.resumen);
        console.log('Próximas citas:', rest.data.proximasCitas);
      },
      error: (error) => {
        console.error('Error al consultar el dashboard:', error);
      }
    });
  }

  ngOnInit(): void {
    this.__obtener_dashboard('1');
  }
}
