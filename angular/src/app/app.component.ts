import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from './_models/employee';
import { AuthenticationService } from './_services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  // checkMenu: boolean = true;
  // currentUser: Employee;

  // constructor(
  //   private router: Router,
  //   private authenticationService: AuthenticationService
  // ) {

  //   this.authenticationService.currentUser.subscribe(
  //     (x) => (this.currentUser = x)
  //   );
  // }

  // changeMenu(event) {
  //   this.checkMenu = event;
  // }

  // logout() {
  //   this.authenticationService.logout();
  //   this.router.navigate(['/login']);
  // }

  // ngOnInit(): void {
  // }

}
