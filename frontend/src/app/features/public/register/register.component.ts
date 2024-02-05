import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, ReactiveFormsModule, RippleModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  user = { email: '', password1: '', password2: '' };

  constructor(private loginService: LoginService) {}

  onFormSubmit() {
    this.loginService.register(this.user.email, this.user.password1).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // handle successful login
      },
      (error) => {
        console.error('Registration failed', error);
        // handle login error
      },
    );
  }
}
