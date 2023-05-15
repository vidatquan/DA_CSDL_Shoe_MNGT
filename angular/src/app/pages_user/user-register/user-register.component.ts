import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/_models/customer';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  resgisterUser: Customer;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resgisterUser = new Customer();
  }

  register(){
    this.router.navigateByUrl('view/log-in');
  }

}
