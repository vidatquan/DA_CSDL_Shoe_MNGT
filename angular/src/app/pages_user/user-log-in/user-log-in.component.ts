import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/_models/customer';

@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.scss']
})
export class UserLogInComponent implements OnInit {
  resgisterUser: Customer;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.resgisterUser = new Customer();
  }

  login(){
    this.router.navigateByUrl('view');

  }

  register(){
    this.router.navigateByUrl('view/register');
  }

  loginAdmin(){
    this.router.navigateByUrl('admin/login');
  }

}
