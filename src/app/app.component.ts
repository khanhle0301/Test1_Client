import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from './models/menu-item';
import { DataService } from './services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('modalAddEdit', { static: false }) public modalAddEdit: ModalDirective;
  public entity: any;
  public menuItems: MenuItem[] = [];
  public keyword = '';

  constructor(
    private notificationService: NotificationService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.get('/menu?keyword=' + this.keyword)
      .subscribe((response: any) => {
        this.menuItems = response;
      });
  }

  add(parentId?: number) {
    this.entity = {
      parentId
    };
    this.modalAddEdit.show();
  }

  edit(item: MenuItem) {
    const copy = JSON.parse(JSON.stringify(item));
    this.entity = copy;
    this.modalAddEdit.show();
  }

  delete(item: any) {
    this.notificationService.printConfirmationDialog(`Bạn có chắc chắn muốn xóa không?`, () => this.deleteItemConfirm(item.id));
  }

  deleteItemConfirm(id: any) {
    this.dataService.delete('/menu', id)
      .subscribe(() => {
        this.loadData();
        this.modalAddEdit.hide();
        this.notificationService.printSuccessMessage(`Xóa menu thành công`);
      }, err => {
        this.notificationService.printErrorMessage(err.error || `Xóa menu KHÔNG thành công`);
      });
  }

  saveChange() {
    if (!this.entity.id) {
      this.dataService.post('/menu', this.entity)
        .subscribe(() => {
          this.loadData();
          this.modalAddEdit.hide();
          this.notificationService.printSuccessMessage(`Thêm mới menu thành công`);
        }, err => {
          this.notificationService.printErrorMessage(err.error || `Thêm mới menu KHÔNG thành công`);
        });
    } else {
      this.dataService.put(`/menu/${this.entity.id}`, this.entity)
        .subscribe(() => {
          this.loadData();
          this.modalAddEdit.hide();
          this.notificationService.printSuccessMessage(`Cập nhật menu thành công`);
        }, err => {
          this.notificationService.printErrorMessage(err.error || `Cập nhật menu KHÔNG thành công`);
        });
    }
  }

  search() {
    this.loadData();
  }
}
