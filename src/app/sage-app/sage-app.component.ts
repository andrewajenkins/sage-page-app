import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { BadgeModule } from 'primeng/badge';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { ChatComponent } from './chat/chat.component';
import { EditorComponent } from './editor/editor.component';
import { RippleModule } from 'primeng/ripple';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { EventBusService } from '../shared/services/event-bus.service';
import {ActionEvent} from "./shared/models/actionEvent";

@Component({
  selector: 'app-sage-app',
  standalone: true,
  imports: [
    SplitterModule,
    BadgeModule,
    StyleClassModule,
    InputTextModule,
    FileTreeComponent,
    ChatComponent,
    EditorComponent,
    RippleModule,
    ToggleButtonModule,
    FormsModule,
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './sage-app.component.html',
  styleUrl: './sage-app.component.scss',
})
export class SageAppComponent {
  showFileTree = false;
  showChat = true;
  showEditor = false;
  constructor(
    private eventBus: EventBusService,
    private router: Router,
  ) {}

  onModelChange(key: string, $event: any) {
    console.log('event:', key, $event);
    const event = {
      sender: 'splitter-toggle-button',
      action: ActionEvent.SPLITTER_BUTTON_TOGGLE,
      value: { button: key, status: $event },
    };

    this.eventBus.emit(event);
  }

  routeTo(route: string) {
    this.router.navigate([route]);
  }
}
