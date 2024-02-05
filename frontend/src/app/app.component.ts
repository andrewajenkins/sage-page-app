import { Component } from '@angular/core';
import { HeaderComponent } from './core/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sage-page-app';
}
