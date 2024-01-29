import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTreeToolbarComponent } from './file-tree-toolbar.component';

describe('ToolbarComponent', () => {
  let component: FileTreeToolbarComponent;
  let fixture: ComponentFixture<FileTreeToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileTreeToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileTreeToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
