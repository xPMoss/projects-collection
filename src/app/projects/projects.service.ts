// Angular
import { Injectable } from '@angular/core';

// rxjs
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// firebase
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/compat/database';

// Models
import { ProjectModel } from "./models/project.model";

@Injectable({ providedIn: 'root' })
export class ProjectsService {

  projects: AngularFireList<ProjectModel>;
  currentProject: ProjectModel;

  constructor( private db:AngularFireDatabase ) {
    console.log("ProjectsService()")

    //this.projects = db.list('projects');
    //console.log(this.projects)

    //google-oauth2|116709753550013423577
    //this.copyData("projects", "2", "google-oauth2|116709753550013423577")
  }


  async copyData(type:any, fromID:any, uid:string){

    // Fetch
    let items = await new Promise<any>((resolve)=> {
      try{
        this.db.list(type).valueChanges().subscribe( data => resolve(data) )
       } 
       catch(e){
        console.log(e)

       }
      
    })

    console.log(items)
    // Set
    for (const data of items) {
      this.db.list(type + "_" + uid).update(data.key, data);
    }


    

  }

  setAllItems(user){
    this.projects = this.db.list('projects_' + user.uid);
  }

  /////////
  // GET //
  getItems(user){
    let data = this.db.list('projects_' + user.uid).valueChanges();
    
    /*
    let obj = new Promise<any>((resolve)=> {
      this.db.list('projects').valueChanges();
      
    })

    console.log(obj)
    */
    
    return this.projects;
  }

  // GET/:name //
  findItemByName(name, user){
    console.log("name: " + name)
    
    //let data = this.db.list( 'projects', ref => ref.orderByChild('name').equalTo( name ) ).valueChanges();

    let obj = new Promise<any>((resolve)=> {
      this.db.list( 'projects_' + user.uid, ref => ref.orderByChild('name').equalTo( name ) ).valueChanges().subscribe( data => resolve(data) )
    })

    //return this.db.list( 'projects', ref => ref.orderByChild('name').equalTo( name ) );

    return obj;
  }

   // GET/:name //
   getItemByKey(key, user):AngularFireList<ProjectModel>{
    console.log("key: " + key)

    return this.db.list( 'projects_' + user.uid, ref => ref.orderByChild('key').equalTo( key ) );
     
  }

  // GET/:name //
  findItem(name, user){
    let obj = new Promise<any>((resolve)=> {
      this.db.list( 'projects_' + user.uid, ref => ref.orderByChild('name').equalTo( name ) ).valueChanges().subscribe( data => resolve(data) )
    })
    
    

    return obj;
  }

  /////////
  // PUT //
  async setItem(item:any, user) {
    console.log("setItem")
    console.log(item.key)

    await this.db.list('projects_' + user.uid).update(item.key, item)
    
  }

  //////////
  // POST //
  async addItem(item, user){
    let status:number;
    let returnedItem = await this.findItem(item.name, user);

    console.log("returnedItem")
    console.log(returnedItem)

    if (returnedItem.length > 0) {
      console.log("FOUND ITEM!!!")
      status = 400;
    }
    else{
      console.log("ITEM NOT FOUND!!!")
      status = 200;
      this.db.list('projects_' + user.uid).push(item)
      console.log("Item added")
    }

    return status

  }

  ////////////
  // DELETE //
  async deleteItem(item, user){
    this.db.list('projects_' + user.uid).remove(item.key);


  }

}