import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MenuItem} from '../models/menu-item';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss']
})
export class MenuListItemComponent {
  expanded: boolean;
  @Input() item: MenuItem;
  @Input() depth: number;
  @Output() public addFinished = new EventEmitter();
  @Output() public editFinished = new EventEmitter();
  @Output() public deleteFinished = new EventEmitter();

  constructor() {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  onItemSelected(item: MenuItem) {
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  add(parentId: number) {
      this.addFinished.emit(parentId);
  }

  edit(item: MenuItem) {
    this.editFinished.emit(item);
  }

  delete(item: MenuItem) {
    this.deleteFinished.emit(item);
  }

}
