// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services
import { AuthService } from '@auth0/auth0-angular';

// firebase
import { AngularFireDatabase } from '@angular/fire/compat/database';

// Models
import { User } from '../models/user.model';


@Injectable({ providedIn: 'root' })
export class UserService {
  isDebugging:boolean = false;
  
  user:User = new User();
  isLoaded:boolean = false;
  
  constructor( 
    private db:AngularFireDatabase, 
    public auth: AuthService,
    
    ) {
    console.log(this.constructor.name)

    // Get user from localStorage
    

    //this.setUser();

  }

  // Set local userdata
  async setUser(){
    console.log(this.constructor.name + ".setUser()")

    let user = await new Promise<any>((resolve)=> {
      this.auth.user$.subscribe(user => resolve(user))
    })
   
    
    //console.log(user)

    // Auth0 params
    this.user.uid = user.sub;
    this.user.email = user.email;
    this.user.name = user.name;
    this.user.picture = user.picture;

    console.log(this.user)

    let data = await this.getUser(this.user);

    //console.log("Returned user")
    //console.log(data)

    if(data.length < 1){
      console.log("No user")
      this.createUser(this.user)
    }

    /*
    this.user.uid = user.uid;
    this.user.email = user.email;
    this.user.displayName = user.displayName;
    
    */
  

  }



  async getUsers() {
    console.log(this.constructor.name + ".getUsers()")

    let users = await new Promise<any>((resolve)=> {
      this.db.object('users').valueChanges().subscribe(users => resolve(users))
    })

    return users
    
  }

    // GET/:id //
  async getUser(user:User){
    console.log(this.constructor.name + ".getuser()")

    let data = await new Promise<any>((resolve)=> {
      this.db.list('users', ref => ref.orderByChild('uid').equalTo( user.uid ) ).valueChanges().subscribe( data => resolve(data) )
    })

    return data;

  }

  // Create new user
  async createUser(user:User){
    console.log(this.constructor.name + ".createUser()")


    this.db.list("users").update(user.uid, user);

  }

}