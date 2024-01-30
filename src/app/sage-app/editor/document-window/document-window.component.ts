import { Component } from '@angular/core';
import { EventBusService } from '../../../shared/services/event-bus.service';
import { Line } from '../../shared/models/line';
import { ActionEvent } from '../../shared/models/actionEvent';
import { LineComponent } from '../../shared/components/line/line.component';
import { NgForOf } from '@angular/common';
import { StateManagementService } from '../../../shared/services/state-management.service';

export interface ContentSection {
  contents: Line[];
}

@Component({
  selector: 'app-document-window',
  standalone: true,
  imports: [LineComponent, NgForOf],
  templateUrl: './document-window.component.html',
  styleUrl: './document-window.component.scss',
})
export class DocumentWindowComponent {
  contentSections: ContentSection[] = [];

  constructor(
    private eventBus: EventBusService,
    private state: StateManagementService,
  ) {
    this.contentSections = this.state.getState('editorContents') || [];
    this.eventBus.on().subscribe((message) => {
      if (message.action == ActionEvent.SEND_LINES_TO_EDITOR) {
        console.log('Event received by DocumentWindowComponent:', JSON.stringify(message));
        message.value.forEach((line: any) => (line.chatSelected = false));
        this.contentSections.push({
          contents: message.value as Line[],
        } as ContentSection);
        this.state.saveState('editorContents', this.contentSections);
      } else if (message.action == ActionEvent.EDITOR_SELECT_ALL) {
        console.log('Event received by DocumentWindow:', JSON.stringify(message));
        for (let section of this.contentSections) for (let line of section.contents) line.editorSelected = true;
        this.state.saveState('editorContents', this.contentSections);
      } else if (message.action == ActionEvent.EDITOR_CLEAR_ALL) {
        console.log('Event received by DocumentWindow:', JSON.stringify(message));
        for (let section of this.contentSections) for (let line of section.contents) line.editorSelected = false;
        this.state.saveState('editorContents', this.contentSections);
      } else if (message.action == ActionEvent.EDITOR_GENERATE) {
        console.log('Event received by DocumentWindow:', JSON.stringify(message));
        const genConten = {
          contentSections: [{ contents: this.contentSections[0]!.contents.filter((line) => line.editorSelected) }],
        };
        this.eventBus.emit({
          sender: 'DocumentWindow',
          action: ActionEvent.GENERATE_FILE_TREE,
          value: this.contentSections,
        });
      }
    });
  }
}
