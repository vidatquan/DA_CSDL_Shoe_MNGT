import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Customer } from 'src/app/_models/customer';
import { CustomerService } from 'src/app/_services/customer.service';
declare let alertify: any;

@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.scss']
})
export class UserLogInComponent implements OnInit {
  // resgisterUser: Customer;
  cusTel;
  password;
  constructor(private router: Router,
    private customerService:CustomerService
    ) { }

  ngOnInit(): void {
    //this.resgisterUser = new Customer();
  }

  register(){
    this.router.navigateByUrl('view/register');
  }

  loginAdmin(){
    this.router.navigateByUrl('admin/login');
  }

  login(){
    if (!this.checkValidate()) return;
    const cus = new Customer();
    cus.CusTel = this.cusTel;
    cus.PassWord = this.password
    this.customerService.loginCustomer(cus).pipe(finalize(() => {
      // setTimeout(() => {
      //   this.router.navigateByUrl('/view');
      // },2000)
    })).subscribe((res) => {
      if(!res){
        alertify.error('SĐT hoặc mật khẩu sai!');
      }
      else
      {
        alertify.success('Đăng nhập thành công');
      //  window.location.reload();
        localStorage.setItem('customer', JSON.stringify(res));

      }
    })

  }


  checkValidate() {
    if (!this.cusTel || this.cusTel === '') {
      alertify.error('Số điện thoại không được trống');
      return false;
    }
    if (!this.password || this.password === '') {
      alertify.error('Mật khẩu không được trống');
      return false;
    }
    return true;
  }
}
