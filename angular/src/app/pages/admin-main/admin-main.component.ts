import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {
  checkMenu: boolean = true;
  currentUser: Employee;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  changeMenu(event) {
    this.checkMenu = event;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }
}
