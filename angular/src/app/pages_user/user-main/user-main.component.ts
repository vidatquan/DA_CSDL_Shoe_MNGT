import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare let alertify: any;

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit {
  title = 'ecommerce';
  //Sidebar toggle show hide function
  status = false;
  isLogIn = false;

  constructor(
    private router: Router
  ) {
    const cus = JSON.parse(localStorage.getItem('customer'));
    if(cus){
      this.isLogIn = true;
    }
    else{
      this.isLogIn = false;
    }
  }

  ngOnInit(): void {
  }


  addToggle()
  {
    this.status = !this.status;
  }

  logOut(){
    alertify.success('Đăng xuất thành công');
    localStorage.setItem('customer',null);
    window.location.reload();
    this.router.navigateByUrl('/view');
  }
}
