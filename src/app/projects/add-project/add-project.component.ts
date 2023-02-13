// Angular
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// rxjs
import { Observable, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { ProjectsService } from '../projects.service'
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../../services/user.service'

// Models
import { ProjectModel } from '../models/project.model'


@Component({
  selector: 'add-project-component',
  templateUrl: './add-project.component.html'
})
export class AddProjectComponent {
  title = 'project-component';

  project:any;
  submitted = false;
  public error$: Observable<any> = this.auth.error$;
  
  constructor(
    private route: ActivatedRoute, 
    public location: Location, 
    public ps:ProjectsService,
    private router: Router,
    public auth: AuthService, public userService:UserService
    ){



  }


  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(async (result) => {
      if (result) {
        await this.userService.setUser();
      }

    });
  }

  ngAfterContentChecked(){

  }

  validate(project){
    let validated = false;

    if (project.name) {
      validated = true;

    }

    return validated;
  }

  async addProject(project:any){

    let validated = this.validate(project);
    let res:any


    if (validated) {
      console.log(this.userService.user)
      res = await this.ps.addItem(project, this.userService.user)
      console.log(res)
      
      if (res == 200) {
        this.submitted = true;
        //this.location.back();
        //this.router.navigateByUrl('/projects');
      }

    }
    else{
      throw new Error("ERROR!");
      

    }
    
    

  }


}
