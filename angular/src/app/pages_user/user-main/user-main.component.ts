import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit {
  title = 'ecommerce';
  //Sidebar toggle show hide function
  status = false;

  constructor() { }

  ngOnInit(): void {
  }


  addToggle()
  {
    this.status = !this.status;
  }
}
