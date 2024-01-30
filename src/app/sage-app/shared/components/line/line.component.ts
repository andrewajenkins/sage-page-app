import { Component, Input } from '@angular/core';
import { Line, LineType } from '../../models/line';
import { CommonModule, JsonPipe, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [
    NgSwitch,
    NgTemplateOutlet,
    NgSwitchCase,
    JsonPipe,
    CheckboxModule,
    MenuModule,
    ButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss',
})
export class LineComponent {
  @Input() line!: Line;
  @Input() context!: string;
  protected readonly LineType = LineType;

  checkboxId = `checkbox-${Math.random()}`;

  items = [
    { label: 'Option 1', icon: 'pi pi-fw pi-pencil' },
    { label: 'Option 2', icon: 'pi pi-fw pi-refresh' },
    // ... more menu items
  ];

  getSelected() {
    if (this.context == 'editor') return this.line.editorSelected;
    else if (this.context == 'chat') return this.line.chatSelected;
    return false;
  }

  toggleSelected() {
    if (this.context == 'editor') this.line.editorSelected = !this.line.editorSelected;
    else if (this.context == 'chat') this.line.chatSelected = !this.line.chatSelected;
  }

  render(pValue: string) {
    return this.replaceWithNumbering(this.replaceWithBullets(this.replaceAsterisksWithStrongTags(pValue)));
  }
  replaceAsterisksWithStrongTags(text: string): string {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }

  replaceWithBullets(text: string) {
    return text.replace(/^-\s(.*?)$/, '<ul><li>$1</li></ul>')
  }

  replaceWithNumbering(text: string) {
     return /^\d+\.\s/.test(text) ? `<div [style]="padding-left: 30px;">${text}</div>` : text;
  }
}
