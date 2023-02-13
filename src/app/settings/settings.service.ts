// Angular
import { Injectable } from '@angular/core';

// rxjs
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// firebase
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/compat/database';


@Injectable({ providedIn: 'root' })
export class SettingsService {

    showAs:string;

    constructor( private db:AngularFireDatabase ) {

        this.showAs = "poster";
    }




}