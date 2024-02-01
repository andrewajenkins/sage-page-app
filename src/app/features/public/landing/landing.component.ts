import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonModule, RippleModule, StyleClassModule, NgClass, NgIf],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  activeTab2: number = 1;
}
