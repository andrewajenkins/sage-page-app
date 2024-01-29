import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { NgForOf, NgIf } from '@angular/common';
import { LineComponent } from '../../shared/components/line/line.component';
import { EventBusService } from '../../../shared/services/event-bus.service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ActionEvent } from '../../shared/models/actionEvent';
import { Line } from '../../shared/models/line';
import { Exchange } from '../chat.component';

@Component({
  selector: 'app-exchange',
  standalone: true,
  imports: [SkeletonModule, NgIf, LineComponent, NgForOf, ButtonModule, RippleModule],
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.scss',
})
export class ExchangeComponent {
  @Input() exchange!: Exchange;

  constructor(private eventBus: EventBusService) {}

  sendToEditor() {
    this.eventBus.emit({
      sender: 'ExchangeComponent',
      action: ActionEvent.SEND_LINES_TO_EDITOR,
      value: this.exchange.lines!.filter((line: Line) => line.chatSelected),
    });
  }

  selectAll() {
    this.exchange.lines!.forEach((line) => (line.chatSelected = true));
  }

  clearAll() {
    this.exchange.lines!.forEach((line) => (line.chatSelected = false));
  }
}
