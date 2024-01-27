import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, ButtonModule, RippleModule, InputTextModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user: { email: string; password: string } = { email: '', password: '' };

  constructor(private loginService: LoginService) {}

  onFormSubmit() {
    this.loginService.login(this.user.email, this.user.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        // handle successful login
      },
      (error) => {
        console.error('Login failed', error);
        // handle login error
      },
    );
  }
}
