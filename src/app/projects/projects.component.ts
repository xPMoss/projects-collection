// Angular
import { Component } from '@angular/core';

// rxjs
import { Observable, throwError, map } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// firebase
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';

// Services
import { ProjectsService } from './projects.service'
import { SettingsService } from "./../settings/settings.service";
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../services/user.service'

// Models
import { ProjectModel } from './models/project.model'

@Component({
  selector: 'projects-component',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  title = 'projects-component';

  isLoading:boolean = true;

  projects: ProjectModel[];

  constructor(
    public ss:SettingsService, 
    public ps:ProjectsService, 
    private db:AngularFireDatabase,
    public auth: AuthService, public userService:UserService
    ){



  }


  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(async (result) => {
      if (result) {
        await this.userService.setUser();
        console.log(this.userService.user)
        await this.ps.setAllItems(this.userService.user);
        this.getProjects();
        this.isLoading = false;
      }

    });

   

  }

  ngAfterContentChecked(){

  }

  async getProjects(){
    console.log(this.constructor.name + "getProjects()")

   
    /*
    let data = await this.ps.getItems().subscribe({
      next:  (data)=> this.projects = data ,
      error: err => console.log(`Error occurred: ${err}`),
      complete: () => console.log("Finished")
    });
    */
    
    // Subscribe to changes and get key for db items
    this.ps.getItems(this.userService.user).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.projects = data;
    });

  }

  async deleteProject(item:any){
    await this.ps.deleteItem(item, this.userService.user);

  }


}
