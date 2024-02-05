import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { Router, RouterOutlet, Routes } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    RippleModule,
    DividerModule,
    SkeletonModule,
    RouterOutlet,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  constructor(private router: Router) {}
  routeToProfile() {
    this.router.navigate(['/app/settings/profile']);
  }
  routeToAccount() {
    this.router.navigate(['/app/settings/account']);
  }
}
