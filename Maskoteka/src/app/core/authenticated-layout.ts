import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppShell } from './app-shell';

@Component({
  selector: 'app-authenticated-layout',
  standalone: true,
  imports: [AppShell, RouterOutlet],
  template: `<app-shell><router-outlet></router-outlet></app-shell>`,
})
export class AuthenticatedLayout {}
