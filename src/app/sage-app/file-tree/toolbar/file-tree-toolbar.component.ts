import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { EventBusService } from '../../../shared/services/event-bus.service';
import { ActionEvent } from '../../shared/models/actionEvent';

@Component({
  selector: 'app-file-tree-toolbar',
  standalone: true,
  imports: [ButtonModule, SplitButtonModule, ToolbarModule, TooltipModule],
  templateUrl: './file-tree-toolbar.component.html',
  styleUrl: './file-tree-toolbar.component.scss',
})
export class FileTreeToolbarComponent {
  constructor(private eventBus: EventBusService) {}
  addFolder() {
    this.eventBus.emit({
      sender: 'FileTreeToolbar',
      action: ActionEvent.FILE_TREE_ADD_FOLDER,
    });
  }
  addDocument() {
    this.eventBus.emit({
      sender: 'FileTreeToolbar',
      action: ActionEvent.FILE_TREE_ADD_DOCUMENT,
    });
  }
}
