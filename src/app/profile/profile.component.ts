// Angular
import { Component } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service'
import { AuthService } from '@auth0/auth0-angular';



@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  title = 'profile-component';


  constructor(public auth: AuthService, public userService:UserService){




  }


  ngOnInit() {

    if (this.auth.isAuthenticated$) {
      this.userService.setUser();
      
    }

  }






}
