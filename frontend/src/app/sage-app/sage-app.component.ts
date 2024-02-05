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
import { ActionEvent } from './shared/models/actionEvent';
import { SelectButtonModule } from 'primeng/selectbutton';

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
    SelectButtonModule,
  ],
  templateUrl: './sage-app.component.html',
  styleUrl: './sage-app.component.scss',
})
export class SageAppComponent {
  gfg = [
    { label: 'File-tree', value: 'file-tree' },
    { label: 'Chat', value: 'chat' },
    { label: 'Editor', value: 'editor' },
  ];
  splitterSelection: any = ['file-tree', 'chat', 'editor'];
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

  setOptions(event: any) {
    console.log('splitterSelection', event, this.splitterSelection);
    this.eventBus.emit({
      sender: 'splitter-toggle-button',
      action: ActionEvent.SPLITTER_BUTTON_TOGGLE,
      value: this.splitterSelection,
    });
  }
}
