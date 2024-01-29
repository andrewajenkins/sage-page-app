import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { EditorComponent } from '../editor/editor.component';
import { FileTreeComponent } from '../file-tree/file-tree.component';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { SplitterModule } from 'primeng/splitter';
import { Subscription } from 'rxjs';
import { EventBusService } from '../../shared/services/event-bus.service';

@Component({
  selector: 'app-splitter',
  standalone: true,
  imports: [ChatComponent, EditorComponent, FileTreeComponent, NgIf, SharedModule, SplitterModule, NgTemplateOutlet],
  templateUrl: './splitter.component.html',
  styleUrl: './splitter.component.scss',
})
export class SplitterComponent {
  showFileTree = false;
  showChat = true;
  showEditor = false;

  private eventSubscription: Subscription;

  constructor(private eventBus: EventBusService) {
    this.eventSubscription = this.eventBus.on().subscribe((event) => {
      console.log(`Event received by SplitterComponent, content ${JSON.stringify(event.value)}`);
      if (event.value?.button == 'file-tree') this.showFileTree = event.value.status;
      if (event.value?.button == 'chat') this.showChat = event.value.status;
      if (event.value?.button == 'editor') this.showEditor = event.value.status;
    });
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}