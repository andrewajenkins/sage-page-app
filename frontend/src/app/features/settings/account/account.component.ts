import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ButtonModule, DividerModule, InputTextModule, InputTextareaModule, RippleModule, SkeletonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  test = 'test';
}
