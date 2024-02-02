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

  submitForm(email: string) {
    const formData: any = new FormData();
    console.log('email:', email);
    formData.append('email', email);
    alert(`Thanks! We'll keep you updated on progress!`);

    this.http
      .post(
        'https://script.google.com/macros/s/AKfycbz1N0jAroWodCJLB_xurMsxXLpHPoVTppRIg0eXsnlHpvghi5_ahskLm5Zb5BFJBIr_/exec',
        formData,
      )
      .subscribe(
        (response) => {
          // Optionally reset the email field after successful submission
          this.email = '';
        },
        (error) => {
          console.error('Error:', error);
          alert('Submission failed. Please try again.');
        },
      );
  }
}
