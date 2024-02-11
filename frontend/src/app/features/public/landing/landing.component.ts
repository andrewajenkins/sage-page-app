import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    ButtonModule,
    RippleModule,
    StyleClassModule,
    NgClass,
    NgIf,
    FormsModule,
    InputTextModule,
    HttpClientModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  email!: string;

  constructor(private http: HttpClient) {}

  submitForm() {
    alert("Thank you for your submission. We'll be in contact soon!");

    this.http.post('/api/newsletter/subscribe', { email: this.email }).subscribe(
        response => {
          console.log('Success!', response)
        },
        error => console.error('Error!', error)
    )
  }
}
