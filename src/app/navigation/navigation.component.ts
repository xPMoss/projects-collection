// Angular
import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// rxjs
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../services/user.service'

import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'navigation-component',
  templateUrl: './navigation.component.html',
  providers: [NgbModalConfig, NgbModal, NgbActiveModal],
})
export class NavigationComponent {
  title = 'navigation-component';
  modal:any;

  isLoggedin:boolean = false;
  isLoggingout:boolean = false;
  isLoading:boolean = true;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private auth: AuthService,
    config: NgbModalConfig, 
    public activeModal:NgbActiveModal,
    private modalService: NgbModal,
    public userService:UserService
  ){



  }


  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((result) => {
      console.log(result);
      this.isLoggedin = result;


    });



  }



  openModal(content) {
		this.modal = this.modalService.open(content);

	}

  async closeModal(){
    this.modal.close();

    this.isLoggingout = true;

    await this.auth.logout({ 
      //returnTo: this.document.location.origin
      
    });

    this.isLoggingout = false;
  }

  login() {
    this.auth.loginWithRedirect().subscribe(async (result) => {
      

      await this.userService.setUser();
      this.isLoading = false;

      
   });
  }


}
