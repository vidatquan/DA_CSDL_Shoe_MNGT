import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Customer } from 'src/app/_models/customer';
import { GetCusInputDto } from 'src/app/_models/get-cus-input-dto';
import { CustomerService } from 'src/app/_services/customer.service';
declare let alertify: any;

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  resgisterCus: Customer;
  cusList= [];
  constructor(
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.resgisterCus = new Customer();
    this.getCusList();
  }

  getCusList(){
   // const cusCache = JSON.parse(localStorage.getItem('customer'));
    var cus = new GetCusInputDto();
    cus.CusName = '';
    cus.CusTel = '';
    this.customerService.getCustomers(cus).subscribe((res) => {
      this.cusList = res;
    });
  }


  register(){
    if (!this.checkValidate()) return;
    this.customerService.registerCustomer(this.resgisterCus).subscribe(() => {
      this.getCusList();
      alertify.success('Đăng ký thành công!');
      this.router.navigateByUrl('/view/login');
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
