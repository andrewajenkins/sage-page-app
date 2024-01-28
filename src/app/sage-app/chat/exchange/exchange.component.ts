import { Component, Input } from '@angular/core';
import {SkeletonModule} from "primeng/skeleton";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-exchange',
  standalone: true,
  imports: [
    SkeletonModule,
    NgIf
  ],
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.scss',
})
export class ExchangeComponent {
  @Input() exchange!: any;
}
