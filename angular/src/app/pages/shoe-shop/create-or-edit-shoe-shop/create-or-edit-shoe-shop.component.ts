import { ShoeShop } from './../../../_models/shoe-shop/ShoeShop';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ShoeShopService } from 'src/app/_services/shoe-shop.service';
declare let alertify: any;
@Component({
  selector: 'create-or-edit-shoe-shop',
  templateUrl: './create-or-edit-shoe-shop.component.html',
  styleUrls: ['./create-or-edit-shoe-shop.component.scss']
})
export class CreateOrEditShoeShopComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output('modalSave') modalSave = new EventEmitter();
  // @Input() areaList = [];
  cus: ShoeShop = new ShoeShop();
  CusName;
  CusTel;
  CusAdd;
  CusEmail;
  action:number;
  cusList = [];
  cusShoeBuyPrice:number;
  statusList = [
    {value: 0 , label : "Đang hoạt động"},
    {value: 1 , label : "Dừng hoạt động"},
  ]
  constructor(private _shoehShopService: ShoeShopService) { }

  ngOnInit() {
    // var cus = new GetCusInputDto();
    // cus.CusName = '';
    // cus.CusTel = '';
    // this._customerService.getCustomers(cus).subscribe((res) => {
    //   this.cusList = res;
    // });
  }

  close() {
    this.modal.hide();
  }

  show(action, event?) {
    this.action = action;
   // this.cusShoeBuyPrice = 0;
    this.cus = new ShoeShop();
    if (event?.Id != undefined) {
      this.cus = event;
     // this.cusShoeBuyPrice = this.cus.CusShoeBuyPrice / 1000;
    };
    this.modal.show();
  }

  save() {
    if (!this.checkValidate()) return;
    if(this.action == 2){
      this._shoehShopService.createShoeShop(this.cus).subscribe(res => {
        alertify.success('Thêm mới thành công');
        this.modalSave.emit(null);
        this.modal.hide();
      });
    }
    else if (this.action == 3){
      //this.cus.CusShoeBuyPrice = this.cusShoeBuyPrice * 1000;
      this._shoehShopService.updateShoeShop(this.cus).subscribe(res => {
        alertify.success('Cập nhật thành công');
        this.modalSave.emit(null);
        this.modal.hide();
      });
    }
  }

  checkValidate() {
    if (!this.cus?.ShopName || this.cus?.ShopName === '') {
      alertify.error('Tên cửa hàng không được trống');
      return false;
    }
    if (this.cus?.IsDeleted == undefined) {
      alertify.error('Trạng thái không được trống!');
      return false;
    };
    return true;
  }
}

