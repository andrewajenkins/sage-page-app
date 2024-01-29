import { Component, Input } from '@angular/core';
import { Line, LineType } from '../../models/line';
import { CommonModule, JsonPipe, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [NgSwitch, NgTemplateOutlet, NgSwitchCase, JsonPipe, CheckboxModule, MenuModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss',
})
export class LineComponent {
  @Input() line!: Line;
  protected readonly LineType = LineType;

  checkboxId = `checkbox-${Math.random()}`;

  items = [
    { label: 'Option 1', icon: 'pi pi-fw pi-pencil' },
    { label: 'Option 2', icon: 'pi pi-fw pi-refresh' },
    // ... more menu items
  ];
}
