// Angular
import { Component } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../services/user.service'

// rxjs
import { from, Observable, throwError, Subject } from 'rxjs';




@Component({
  selector: 'home-component',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title = 'home-component';

  isLoading:boolean = true;
  isLoggedin:boolean = false;
  private user = new Subject();
  public user$ = this.user.asObservable();


  constructor(public auth: AuthService, public userService:UserService){



  }


  ngOnInit() {

    this.auth.isAuthenticated$.subscribe(async (result) => {
      console.log(result);
      this.isLoggedin = result;

      if (this.isLoggedin) {
        this.isLoading = true;

        await this.userService.setUser();
        this.isLoading = false;

      }

    });
   

  }

  login() {
    this.auth.loginWithRedirect().subscribe(async (result) => {
      

      console.log(this.user$);
      console.log('User Logged in as: ', result +  ", " +  this.user$);
      //this.authService.user.next(result) // add this!
      //....
      await this.userService.setUser();
      this.isLoading = false;

      
   });
  }




}
