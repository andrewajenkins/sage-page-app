import { Component } from '@angular/core';
import { EventBusService } from '../../../shared/services/event-bus.service';
import { Line } from '../../shared/models/line';
import { ActionEvent } from '../../shared/models/actionEvent';
import { LineComponent } from '../../shared/components/line/line.component';
import { NgForOf } from '@angular/common';
import { StateManagementService } from '../../../shared/services/state-management.service';
import { TreeNode } from 'primeng/api';

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
  contents: Line[];

  constructor(
    private eventBus: EventBusService,
    private state: StateManagementService,
  ) {
    this.contents = this.state.getState('editorContents') || [];
    this.eventBus.on().subscribe((message) => {
      if (message.action == ActionEvent.SEND_LINES_TO_EDITOR) {
        console.log('Event received by DocumentWindowComponent:', JSON.stringify(message));
        message.value.forEach((line: any) => (line.chatSelected = false));
        for (let line of message.value) this.contents.push(line);
        this.state.saveState('editorContents', this.contents);
      } else if (message.action == ActionEvent.EDITOR_SELECT_ALL) {
        console.log('Event received by DocumentWindow:', JSON.stringify(message));
        for (let line of this.contents) line.editorSelected = true;
        this.state.saveState('editorContents', this.contents);
      } else if (message.action == ActionEvent.EDITOR_CLEAR_ALL) {
        console.log('Event received by DocumentWindow:', JSON.stringify(message));
        for (let line of this.contents) line.editorSelected = false;
        this.state.saveState('editorContents', this.contents);
      } else if (message.action == ActionEvent.EDITOR_GENERATE) {
        console.log('Event received by DocumentWindow:', JSON.stringify(message));
        const genContent = this.contents.filter((line) => line.editorSelected);
        this.eventBus.emit({
          sender: 'DocumentWindow',
          action: ActionEvent.GENERATE_FILE_TREE,
          value: genContent,
        });
      } else if (message.action == ActionEvent.LOAD_EDITOR_CONTENT) {
        this.contents = this.preOrderTraversal(message.value);
      }
    });
  }

  preOrderTraversal(rootNodes: TreeNode[]): Line[] {
    console.log('traversal:', rootNodes);
    if (!rootNodes?.length) return [];
    let result: Line[] = [];

    function traverse(node: any) {
      console.log('traversing:', node);
      result.push(node.data);

      if (node.children && node.children.length > 0) {
        node.children.forEach((child: any) => traverse(child));
      }
    }

    rootNodes.forEach((node: any) => traverse(node));
    return result;
  }
}
