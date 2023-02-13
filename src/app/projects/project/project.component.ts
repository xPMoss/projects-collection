// Angular
import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// rxjs
import { Observable, map } from 'rxjs';

// Services
import { ProjectsService } from './../projects.service'
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../../services/user.service'

// Models
import { ProjectModel } from '../models/project.model'


@Component({
  selector: 'projects-component',
  templateUrl: './project.component.html'
})
export class ProjectComponent {
  title = 'project-component';

  key:string;
  message = '';
  completedItemsCount: number;
  projectIndex:number;

  constructor(
    private router:Router,
    private route: ActivatedRoute, 
    public location: Location, 
    public ps:ProjectsService,
    public auth: AuthService, public userService:UserService
    ){



  }

  // ----- LIFECYCLE HOOKS ----- //

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(async (result) => {
      if (result) {
        await this.userService.setUser();
        this.getProject();
        if (!this.ps.currentProject) {
          this.location.back();
        }
    
        this.getIndex()
      }

    });
    
    this.message = '';

    

    
    


  }

  ngOnChanges(): void {
    console.log("Change")
    this.message = '';
    

  }

  ngDoCheck(){
    //console.log("ngDocheck")

  }

  ngAfterContentChecked(){

  }

  ngOnDestroy(){
    //console.log("Destroyed")
  }

  // ---------- //

  getIndex(){

    console.log("project.getIndex()")
    let projects = new Promise<any>((resolve)=> {
      this.ps.projects.valueChanges().subscribe( data => {
        resolve(data);
       
        let projects = data
        this.completedItemsCount = projects.length;

        //console.log(projects)

        projects.forEach(element => {
          if (element.key == this.ps.currentProject.key) {
            this.projectIndex = projects.indexOf(element);


          }
        });

        //console.log("projectIndex:" + this.projectIndex)
        //console.log("cItemsCount: " + this.completedItemsCount)
        
      })
    })

  }

  
  

  navProjects(dir:any){
    

    let projects = new Promise<any>((resolve)=> {
      this.ps.projects.valueChanges().subscribe( data => {
        resolve(data);
       
        let projects = data
        //console.log(projects)
        //console.log(this.ps.currentProject)
        let index;

        projects.forEach(element => {
          if (element.key == this.ps.currentProject.key) {
            index = projects.indexOf(element);

            //console.log(index)
          }
        });

        if (dir == "+") {
          if (index < projects.length-1) {
            this.ps.currentProject = projects[index+1];
          }

        }
        else{
          if (index > 0) {
            this.ps.currentProject = projects[index-1];
          }
          
        }

        this.getIndex()
        this.router.navigate(['/projects/' + this.ps.currentProject.name]);
        //this.ps.projects.indexOf(10)

      })
      
    })



  }

  async getProject(){
    let name = this.route.snapshot.paramMap.get('name');
    
    /*
    this.ps.getItems().subscribe({
      next:  (data)=> this.items = data ,
      error: err => console.log(`Error occurred: ${err}`),
      complete: () => console.log()
    });
    */

    /*
    let data = await this.ps.getItem(name)
    console.log(data)
    this.project = data[0];
    console.log("this.project")
    console.log(this.project.key)
    */

    
    /*
    // Subscribe to changes and get key for db items
    this.ps.getItemByKey(this.key).snapshotChanges().pipe(
      map(changes =>
        changes.map( (c) =>
          ({ 
            key: c.payload.key, ...c.payload.val()
            
          })
        )
      )
    ).subscribe(data => {
      //this.project = data[0];
    });
    */

    
    //console.log(this.project.key)



  }

  validate(project){
    let validated = false;

    if (project.name) {
      validated = true;

    }

    return validated;
  }

  async setProject(project){
    let validated = this.validate(project);
    let res:any
    
    console.log("ProjectComponent.setProject()")
    console.log(project)

    if (validated) {
      await this.ps.setItem(project, this.userService.user)
      //this.location.replaceState("projects/" + project.name);
      
    }
    else{
      throw new Error("ERROR!");
      

    }
  }

  async deleteProject(item:any){
    await this.ps.deleteItem(item, this.userService.user);
    this.location.back();

  }


}
