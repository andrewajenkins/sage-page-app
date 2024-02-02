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
    // Construct the payload. Google Script expects 'application/x-www-form-urlencoded' content type for FormData.
    const payload = new FormData();
    payload.append('email', email);

    // Google Script URL
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbz1N0jAroWodCJLB_xurMsxXLpHPoVTppRIg0eXsnlHpvghi5_ahskLm5Zb5BFJBIr_/exec';

    // Send the request using HttpClient
    this.http.post(scriptUrl, payload).subscribe(
      (response) => {
        this.email = ''; // Reset the email field after successful submission
      },
      (error) => {
        console.error('Error:', error);
        alert('Submission failed. Please try again.');
      }
    );
  }
}
