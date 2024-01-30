import { Component, OnInit } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { EventBusService } from '../../../shared/services/event-bus.service';
import { ActionEvent } from '../../shared/models/actionEvent';
import { Line } from '../../shared/models/line';
import { StateManagementService } from '../../../shared/services/state-management.service';

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

  constructor(
    private state: StateManagementService,
    private eventBus: EventBusService,
  ) {
    this.data = this.state.getState('file-tree') || this.testData;
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
      } else if (event.action == ActionEvent.GENERATE_FILE_TREE) {
        console.log('Received event, FileTree:', event);
        if (this.lastEvent && this.lastEvent.node.icon.includes('book')) {
          const subTrees = this.buildSubTree(event.value as Line[]);
          if (this.lastEvent) {
            for (let subTree of subTrees) this.lastEvent.node.children.push(subTree);
          } else {
            for (let subTree of subTrees) this.data[0].children!.push(subTree);
          }
        } else {
          alert('Please select a wiki to generate');
        }
      }
      this.state.saveState('file-tree', this.data);
    });
  }

  ngOnInit() {}

  handleClick(event: any) {
    console.log('tree-event:', event);
    this.lastEvent = event;
    if (!event.node.icon.includes('folder')) {
      this.eventBus.emit({
        sender: 'Tree',
        action: ActionEvent.LOAD_EDITOR_CONTENT,
        value: this.lastEvent.node.children,
      });
    }
  }

  buildSubTree(lines: Line[]) {
    const queue: TreeNode<any>[] = [];
    const roots: TreeNode<any>[] = [];
    let queuePointer = -1;
    for (let line of lines) {
      console.log('queuePointer:', queuePointer);
      console.log('queue:', queue);
      console.log('roots:', roots);
      console.log('line:', line.rawValue);
      if (line.type.startsWith('format_h')) {
        const depth = parseInt(line.type.match(/\d+/)![0]);
        if (depth == 1) {
          console.log('ADDING heading to roots');
          const newNode = {
            line: line,
            label: line.pValue,
            parent: undefined,
            icon: 'pi pi-align-justify',
            children: [],
          } as TreeNode;
          roots.push(newNode);
          queuePointer = 0;
          queue[queuePointer] = newNode;
        } else {
          console.log('ADDING heading to', depth);
          queuePointer = depth - 1;
          const parent = queue[queuePointer - 1];
          const newNode = {
            line: line,
            label: line.pValue,
            parent: parent,
            icon: 'pi pi-align-justify',
            children: [],
          } as TreeNode;
          parent.children!.push(newNode);
          queue[queuePointer] = newNode;
        }
      } else {
        const newNode = {
          line: line,
          label: line.pValue,
          parent: undefined,
          icon: 'pi pi-align-justify',
        } as TreeNode;
        if (queuePointer < 0) {
          console.log('ADDING content to roots');
          roots.push(newNode);
        } else {
          console.log('ADDING contents to', queuePointer);
          queue[queuePointer].children!.push(newNode);
        }
      }
    }
    return roots;
  }

  testCols = [
    { field: 'name', header: 'First Name' },
    { field: 'age', header: 'Age' },
  ];

  testData = [
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
              children: [],
            },
            {
              label: 'Causes of WW2',
              icon: 'pi pi-book',
              children: [],
            },
          ],
        },
        {
          label: 'Test wiki',
          icon: 'pi pi-book',
          children: [],
        },
      ],
    },
  ];
}
