import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { EventBusService } from '../../../shared/services/event-bus.service';
import { ActionEvent } from '../../shared/models/actionEvent';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, InputTextModule, SplitButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  items: any = ['one', 'two'];

  constructor(private eventBus: EventBusService) {}

  selectAll() {
    this.eventBus.emit({
      sender: 'EditorToolbar',
      action: ActionEvent.EDITOR_SELECT_ALL,
    });
  }

  clearAll() {
    this.eventBus.emit({
      sender: 'EditorToolbar',
      action: ActionEvent.EDITOR_CLEAR_ALL,
    });
  }

  generate() {
    this.eventBus.emit({
      sender: 'EditorToolbar',
      action: ActionEvent.EDITOR_GENERATE,
    });
  }
}
