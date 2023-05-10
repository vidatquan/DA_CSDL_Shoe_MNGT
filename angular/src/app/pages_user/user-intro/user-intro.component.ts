import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-intro',
  templateUrl: './user-intro.component.html',
  styleUrls: ['./user-intro.component.scss']
})
export class UserIntroComponent implements OnInit {
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
