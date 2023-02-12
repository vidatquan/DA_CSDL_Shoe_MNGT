import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCusInputDto } from 'src/app/_models/get-cus-input-dto';
import { ShoeSupplier } from 'src/app/_models/shoe-supplier/shoe-supplier';
import { ShoeSupplierService } from 'src/app/_services/shoe-supplier.service';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit-shoe-supplier',
  templateUrl: './create-or-edit-shoe-supplier.component.html',
  styleUrls: ['./create-or-edit-shoe-supplier.component.scss']
})
export class CreateOrEditShoeSupplierComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output('modalSave') modalSave = new EventEmitter();
  @Input() areaList = [];
  cus: ShoeSupplier = new ShoeSupplier();
  CusName;
  CusTel;
  CusAdd;
  CusEmail;
  action:number;
  cusList = [];
  cusShoeBuyPrice:number;

  statusList = [
    {value: 0 , label : "Hoạt động"},
    {value: 1 , label : "Nghỉ việc"},
  ]
  constructor(private _shoeSupplierService: ShoeSupplierService) { }

  ngOnInit() {
    var cus = new GetCusInputDto();
    cus.CusName = '';
    cus.CusTel = '';
    this._shoeSupplierService.getCustomers(cus).subscribe((res) => {
      this.cusList = res;
    });
  }

  close() {
    this.modal.hide();
  }

  show(action, event?) {
    this.action = action;
    this.cusShoeBuyPrice = 0;
    this.cus = new ShoeSupplier();
    if (event?.Id != undefined) {
      this.cus = event;
      //this.cusShoeBuyPrice = this.cus.CusShoeBuyPrice / 1000;
    };
    this.modal.show();
  }

  save() {
    if (!this.checkValidate()) return;
    if(this.action == 2){
      this._shoeSupplierService.registerCustomer(this.cus).subscribe(res => {
        alertify.success('Thêm mới thành công');
        this.modalSave.emit(null);
        this.modal.hide();
      });
    }
    else if (this.action == 3){
      // this.cus.CusShoeBuyPrice = this.cusShoeBuyPrice * 1000;
      this._shoeSupplierService.updateCustomer(this.cus).subscribe(res => {
        alertify.success('Cập nhật thành công');
        this.modalSave.emit(null);
        this.modal.hide();
      });
    }
  }

  checkValidate() {
    if (!this.cus?.SupplierName || this.cus?.SupplierName === '') {
      alertify.error('Tên nhà cung  cấp không được trống');
      return false;
    }
    if (!this.cus?.Phone || this.cus?.Phone === '') {
      alertify.error('Số điện thoại nhà cung  cấp không được trống');
      return false;
    }
    if(!this.phoneNumberValidate(this.cus?.Phone)) {
      alertify.error('Số điện thoại nhà cung  cấp không hợp lệ');
      return false;
    }
    if(this.cusList.some(e => e.CusTel == this.cus?.Phone && e.Id != this.cus.Id)){
      alertify.error('Số điện thoại nhà cung cấp đã tồn tại');
      return false;
    }
    return true;
  }
  // Số điện thoại
  phoneNumberValidate(phoneNumber: string) {
    const PHONE_NUMBER_REGEX = /(0|[+]([0-9]{2})){1}[ ]?[0-9]{2}([-. ]?[0-9]){7}|((([0-9]{3}[- ]){2}[0-9]{4})|((0|[+][0-9]{2}[- ]?)(3|7|8|9|1)([0-9]{8}))|(^[\+]?[(][\+]??[0-9]{2}[)]?([- ]?[0-9]{2}){2}([- ]?[0-9]{3}){2}))$/gm;
    return !phoneNumber || PHONE_NUMBER_REGEX.test(phoneNumber);
  }

  emailValidate(email: string) {
    const NUMBER_REG = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return NUMBER_REG.test(email);
  }

}
