// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Angular/routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Environment variabels
import { environment as env } from '../environments/environment';

// Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

//Home
import { HomeComponent } from "./home/home.component";

// Projects
import { ProjectsComponent } from "./projects/projects.component";
import { ProjectComponent } from "./projects/project/project.component";
import { AddProjectComponent } from "./projects/add-project/add-project.component";

// Shared
import { NavigationComponent } from "./navigation/navigation.component";
import { FooterComponent } from "./footer/footer.component";

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Auth
import { AuthModule } from '@auth0/auth0-angular';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { AuthService } from '@auth0/auth0-angular';

import { ErrorComponent } from './error/error.component';
import { UserService } from './services/user.service'

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    ProjectsComponent,
    ProjectComponent,
    AddProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: env.auth.domain,
      clientId: env.auth.clientId,
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
      ...env.auth,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    AngularFireModule.initializeApp(env.firebase),
    AngularFirestoreModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
      
    },
    AuthService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
