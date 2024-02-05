import { Component } from '@angular/core';
import { FooterComponent } from '../../core/footer/footer.component';
import { HeaderComponent } from '../../core/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
})
export class PublicComponent {}
