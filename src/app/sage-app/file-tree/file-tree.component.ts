import { Component } from '@angular/core';
import { TreeComponent } from './tree/tree.component';
import { FileTreeToolbarComponent } from './toolbar/file-tree-toolbar.component';

@Component({
  selector: 'app-file-tree',
  standalone: true,
  imports: [TreeComponent, FileTreeToolbarComponent],
  templateUrl: './file-tree.component.html',
  styleUrl: './file-tree.component.scss',
})
export class FileTreeComponent {}
