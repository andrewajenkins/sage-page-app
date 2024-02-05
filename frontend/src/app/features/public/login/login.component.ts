import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, ButtonModule, RippleModule, InputTextModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user = { email: '', password: '' };

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  onFormSubmit() {
    this.loginService.login(this.user.email, this.user.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/app']); // Navigate to the app
      },
      (error) => {
        console.error('Login failed', error);
        // Handle login error
      },
    );
  }
}
