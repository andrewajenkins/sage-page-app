import { Component, OnInit } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { EventBusService } from '../../../shared/services/event-bus.service';
import { ActionEvent } from '../../shared/models/actionEvent';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [TreeModule],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
})
export class TreeComponent implements OnInit {
  data!: TreeNode[];
  cols!: any[];
  lastEvent!: any;

  constructor(private eventBus: EventBusService) {
    this.eventBus.on().subscribe((event) => {
      if (event.action == ActionEvent.FILE_TREE_ADD_DOCUMENT) {
        console.log('Received event, FileTree:', JSON.stringify(event));
        if (this.lastEvent && this.lastEvent.node.icon.includes('folder')) {
          this.lastEvent.node.children.push({
            label: 'New document',
            parent: this.lastEvent.node.parent,
            icon: 'pi pi-book',
            children: [],
          } as TreeNode);
          this.lastEvent.node.expanded = true;
        }
      } else if (event.action == ActionEvent.FILE_TREE_ADD_FOLDER) {
        console.log('Received event, FileTree:', JSON.stringify(event));
        if (this.lastEvent && this.lastEvent.node.icon.includes('folder')) {
          this.lastEvent.node.children.push({
            label: 'New folder',
            parent: this.lastEvent.node.parent,
            icon: 'pi pi-folder',
            children: [],
          } as TreeNode);
          this.lastEvent.node.expanded = true;
        }
      }
    });
  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'First Name' },
      { field: 'age', header: 'Age' },
    ];
    this.data = [
      {
        label: 'Wikis',
        icon: 'pi pi-folder',
        expanded: true,
        children: [
          {
            label: 'List',
            icon: 'pi pi-folder',

            children: [
              {
                label: 'History of philosophy',
                icon: 'pi pi-book',
              },
              {
                label: 'Causes of WW2',
                icon: 'pi pi-book',
              },
            ],
          },
          {
            label: 'Test wiki',
            icon: 'pi pi-book',
          },
        ],
      },
    ];
  }

  handleClick(event: any) {
    console.log('tree-event:', event);
    this.lastEvent = event;
  }
}
