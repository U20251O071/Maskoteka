import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: ` <aside class="sidebar">
      <div class="side-logo">M</div>
      <a
        class="side-link"
        routerLink="/dashboard"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
        >🏠</a
      >
      <a class="side-link" routerLink="/mascotas" routerLinkActive="active">🐾</a>
      <a class="side-link" routerLink="/citas" routerLinkActive="active">📅</a>
      <a class="side-link" routerLink="/agendar" routerLinkActive="active">➕</a>
      <div class="sidebar-footer">
        <a class="side-link" routerLink="/usuario" routerLinkActive="active">⚙</a>
        <a class="side-link" routerLink="/login">↩</a>
      </div>
    </aside>
    <main class="with-sidebar">
      <nav class="topbar">
        <a routerLink="/dashboard" class="d-flex align-items-center gap-2 text-white"
          ><span>🐾</span><strong>Maskoteka</strong></a
        >
        <ul class="nav mx-auto">
          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="/dashboard"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              >🏠 Inicio</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/mascotas" routerLinkActive="active">🐾 Mis mascotas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/citas" routerLinkActive="active">📅 Mis citas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/agendar" routerLinkActive="active">➕ Agendar cita</a>
          </li>
        </ul>
        <a routerLink="/usuario" class="d-flex align-items-center gap-3 text-white"
          ><span class="avatar" style="width:34px;height:34px;font-size:16px">👤</span
          ><span>Erick M.</span><span>⌄</span></a
        >
      </nav>
      <section class="content"><ng-content></ng-content></section>
    </main>`,
})
export class AppShell {}
