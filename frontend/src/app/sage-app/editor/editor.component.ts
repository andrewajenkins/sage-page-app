import { Component } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DocumentWindowComponent } from './document-window/document-window.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [ToolbarComponent, DocumentWindowComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {}
