import { Component, OnDestroy } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { EditorComponent } from '../editor/editor.component';
import { FileTreeComponent } from '../file-tree/file-tree.component';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { SplitterModule } from 'primeng/splitter';
import { Subscription } from 'rxjs';
import { EventBusService } from '../../shared/services/event-bus.service';
import { ActionEvent } from '../shared/models/actionEvent';

@Component({
  selector: 'app-splitter',
  standalone: true,
  imports: [ChatComponent, EditorComponent, FileTreeComponent, NgIf, SharedModule, SplitterModule, NgTemplateOutlet],
  templateUrl: './splitter.component.html',
  styleUrl: './splitter.component.scss',
})
export class SplitterComponent implements OnDestroy {
  showFileTree = true;
  showChat = true;
  showEditor = true;

  private eventSubscription: Subscription;

  constructor(private eventBus: EventBusService) {
    this.eventSubscription = this.eventBus.on().subscribe((event) => {
      if (event.action === ActionEvent.SPLITTER_BUTTON_TOGGLE) {
        console.log(`Event received by SplitterComponent, content ${JSON.stringify(event.value)}`);
        this.showFileTree = event.value.includes('file-tree');
        this.showChat = event.value.includes('chat');
        this.showEditor = event.value.includes('editor');
      }
    });
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
