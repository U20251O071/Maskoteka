import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project-service';

interface LoginResponse {
  isSuccess: boolean;
  errorCode: string;
  errorMessage: string;
  data: {
    idUsuario: number;
    nombres: string;
    apellidos: string;
    correo: string;
    rol: string;
  } | null;
}

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
  cargando = false;
  mensajeError = '';

  constructor(
    private readonly router: Router,
    private readonly ps: ProjectService,
  ) {}

  ingresar(): void {
    this.submitted = true;
    this.mensajeError = '';

    if (!this.email.trim() || !this.password.trim()) {
      return;
    }

    const usuario = {
      correo: this.email.trim(),
      clave: this.password,
    };

    this.cargando = true;

    this.ps.login_usuario(usuario).subscribe({
      next: (rest: any) => {
        const respuesta = rest as LoginResponse;

        if (!respuesta.isSuccess || respuesta.data === null) {
          this.mensajeError =
            respuesta.errorMessage ||
            'Correo o contraseña incorrectos.';

          this.cargando = false;
          return;
        }

        localStorage.setItem(
          'idUsuario',
          respuesta.data.idUsuario.toString(),
        );

        localStorage.setItem(
          'nombres',
          respuesta.data.nombres,
        );

        localStorage.setItem(
          'apellidos',
          respuesta.data.apellidos,
        );

        localStorage.setItem(
          'correo',
          respuesta.data.correo,
        );

        localStorage.setItem(
          'rol',
          respuesta.data.rol,
        );

        localStorage.setItem(
          'usuario',
          JSON.stringify(respuesta.data),
        );

        this.cargando = false;

        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        console.error(
          'Error al iniciar sesión:',
          error,
        );

        this.mensajeError =
          'No se pudo conectar con el servicio de inicio de sesión.';

        this.cargando = false;
      },
    });
  }
}
