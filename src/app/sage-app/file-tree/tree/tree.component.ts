import { Component } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { EventBusService } from '../../../shared/services/event-bus.service';
import { ActionEvent } from '../../shared/models/actionEvent';
import { Line } from '../../shared/models/line';
import { StateManagementService } from '../../../shared/services/state-management.service';
import cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [TreeModule],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
})
export class TreeComponent {
  data!: TreeNode[];
  lastEvent!: any;
  filteredData!: TreeNode[];

  constructor(
    private state: StateManagementService,
    private eventBus: EventBusService,
  ) {
    this.data = this.state.getState('file-tree') || this.testData;
    this.filteredData = this.filter(cloneDeep(this.data));
    this.eventBus.on().subscribe((event) => {
      if (event.action == ActionEvent.FILE_TREE_ADD_DOCUMENT) {
        console.log('Received event, FileTree:', JSON.stringify(event));
        if (this.lastEvent && this.lastEvent.node.icon.includes('folder')) {
          const fullNode = this.findNodeInTree(this.data, this.lastEvent.node.key);
          fullNode!.children!.push({
            key: this.getID(),
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
          const fullNode = this.findNodeInTree(this.data, this.lastEvent.node.key);
         fullNode!.children!.push({
            key: this.getID(),
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
            const fullNode = this.findNodeInTree(this.data, this.lastEvent.node.key);
            console.log('lastEvent', this.lastEvent, fullNode, this.data);
            for (let subTree of subTrees) fullNode!.children!.push(subTree);
          } else {
            console.log('not lastEvent');
            for (let subTree of subTrees) this.data[0].children!.push(subTree);
          }
          // this.filteredData = this.filter(cloneDeep(this.data));
        } else {
          alert('Please select a wiki to generate');
        }
      }
      this.state.saveState('file-tree', this.data);
      this.filteredData = this.filter(cloneDeep(this.data));
    });
  }
  filter(nodes: TreeNode[]): TreeNode[] {
    const typesToFilter = ['ol', 'ul', 'text_fields'];
    return nodes.filter((node) => {
      if (typesToFilter.includes(node.data?.type || 'fail')) {
        return false;
      }

      // If the node has children, recursively filter the children
      if (node.children && node.children.length > 0) {
        node.children = this.filter(node.children);
      }

      return true;
    });
  }

  findNodeInTree(tree: TreeNode[], idToFind: string): TreeNode | null {
    for (const node of tree) {
      console.log('key:', node.key, 'node:', node);
      if (node.key === idToFind) {
        return node; // Found the node
      } else if (node.children && node.children.length > 0) {
        const foundChild = this.findNodeInTree(node.children, idToFind);
        if (foundChild) return foundChild; // Found the node in children
      }
    }
    return null;
  }

  handleClick(event: any) {
    console.log('tree-event:', event);
    this.lastEvent = event;
    if (!event.node.icon.includes('folder') && this.state.getState('editorMode') == 'editor') {
      const correspondingNode = this.findNodeInTree(this.data, this.lastEvent.node.key) as TreeNode;
      console.log('foundNode:', correspondingNode);
      if (correspondingNode?.children) {
        this.eventBus.emit({
          sender: 'Tree',
          action: ActionEvent.LOAD_EDITOR_CONTENT,
          value: correspondingNode.children,
        });
      }
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
            key: this.getID(),
            data: line,
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
            key: this.getID(),
            data: line,
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
          key: this.getID(),
          data: line,
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

  testData = [
    {
      key: this.getID(),
      label: 'Wikis',
      icon: 'pi pi-folder',
      expanded: true,
      children: [],
    },
  ];

  getID(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
