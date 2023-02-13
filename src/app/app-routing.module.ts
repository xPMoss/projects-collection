import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { HomeComponent } from "./home/home.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ProjectComponent } from "./projects/project/project.component";
import { AddProjectComponent } from "./projects/add-project/add-project.component";

import { ProfileComponent } from "./profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'projects/:name', component: ProjectComponent, canActivate: [AuthGuard] },
  { path:'addproject', component: AddProjectComponent, canActivate: [AuthGuard] },
  { path:'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path:'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
