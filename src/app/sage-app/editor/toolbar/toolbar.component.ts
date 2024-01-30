import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EventBusService } from '../../../shared/services/event-bus.service';
import { ActionEvent } from '../../shared/models/actionEvent';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateManagementService } from '../../../shared/services/state-management.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    SelectButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  editorMode: any = 'editor';
  gfg = [
    { label: 'Editor', value: 'editor' },
    { label: 'Generator', value: 'generator' },
  ];
  constructor(
    private state: StateManagementService,
    private eventBus: EventBusService,
  ) {
    this.updateEditorMode();
  }

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

  updateEditorMode() {
    this.state.saveState('editorMode', this.editorMode);
  }
}
