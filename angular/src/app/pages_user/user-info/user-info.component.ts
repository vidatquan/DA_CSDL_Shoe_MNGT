import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/_models/customer';
import { GetCusInputDto } from 'src/app/_models/get-cus-input-dto';
import { CustomerService } from 'src/app/_services/customer.service';
declare let alertify: any;

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  resgisterCus: Customer;
  cusList= [];
  constructor(
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
     //const cus = JSON.parse(localStorage.getItem('customer'));
    // if(cus) this.resgisterCus = cus ?? new Customer();
    this.getCusList();
  }

  getCusList(){
    const cusCache = JSON.parse(localStorage.getItem('customer'));
    var cus = new GetCusInputDto();
    cus.CusName = '';
    cus.CusTel = '';
    this.customerService.getCustomers(cus).pipe(finalize(() => {
      localStorage.setItem('customer', JSON.stringify(this.resgisterCus));
    })).subscribe((res) => {
      this.cusList = res;
      this.resgisterCus = this.cusList.find(e => e.Id == cusCache.Id) ?? new Customer();
    });
  }

  update(){
    if (!this.checkValidate()) return;
    this.customerService.updateCustomer(this.resgisterCus).subscribe(() => {
      this.getCusList();
      alertify.success('Cập nhật thành công!');
    });
  }

  checkValidate() {
    if (!this.resgisterCus?.CusName || this.resgisterCus?.CusName === '') {
      alertify.error('Tên không được trống');
      return false;
    }
    if (!this.resgisterCus?.CusTel || this.resgisterCus?.CusTel === '') {
      alertify.error('Số điện thoại không được trống');
      return false;
    }
    if (!this.resgisterCus?.PassWord || this.resgisterCus?.PassWord === '') {
      alertify.error('Mật khẩu không được trống');
      return false;
    }
    if(!this.phoneNumberValidate(this.resgisterCus?.CusTel)) {
      alertify.error('Số điện thoại không hợp lệ');
      return false;
    }
    if(this.cusList.some(e => e.CusTel == this.resgisterCus?.CusTel && e.Id != this.resgisterCus.Id)){
      alertify.error('Số điện thoại đã tồn tại');
      return false;
    }
    if (this.resgisterCus?.CusEmail && !this.emailValidate(this.resgisterCus?.CusEmail)) {
      alertify.error('Email không hợp lệ');
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
