import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { GlobalPageComponent } from './global-page/global-page.component';
import { JobPageComponent } from './job-page/job-page.component';
import { AllJobPageComponent } from './all-job-page/all-job-page.component';
import { JobDataPageComponent } from './job-data-page/job-data-page.component';
//import { OnlyLoggedInUsersGuard } from './auth/loggedin.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full',
  },
  {
    path: 'login',
    redirectTo: '/global-settings', 
    pathMatch: 'full',
  },
  {
    path: 'global-settings',
    component: GlobalPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'job-settings',
    pathMatch: 'full',
    children:[
      { path: '', component: JobPageComponent},
      { path: ':id', component: JobDataPageComponent},
    ] 
  },
  {
    path: 'all-jobs',
    component: AllJobPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
