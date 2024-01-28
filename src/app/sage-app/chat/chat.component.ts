import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ChatService } from './chat.service';
import { ExchangeComponent } from './exchange/exchange.component';
import { NgForOf } from '@angular/common';
import {StateManagementService} from "../../shared/services/state-management.service";

interface Exchange {
  query: string;
  response: string | null;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    ExchangeComponent,
    NgForOf,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  chatModels = ['GPT3', 'GPT4'];
  selectedModel = 'GPT4';
  exchanges!: Exchange[];

  constructor(private chatService: ChatService, private stateService: StateManagementService) {
    this.exchanges = this.stateService.getState('exchanges') || []
  }

  onButtonClick(query: string) {
    console.log('button clicked');
    this.exchanges.push({
      query: query,
      response: null,
    });
    this.chatService.sendQuary(query).subscribe(
      (response) => {
        const content = response.choices[0].message.content;
        console.log('Response:', content);
        this.exchanges.pop();
        this.exchanges.push({
          query: query,
          response: content,
        })
        this.stateService.saveState('exchanges', this.exchanges);
      },
      (error) => {
        console.error('Error:', error);
      },
    );
  }
}
