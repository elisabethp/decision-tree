import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlobalPageComponent } from './pages/global-page/global-page.component';
import { JobPageComponent } from './pages/job-page/job-page.component';
import { AllJobPageComponent } from './pages/all-job-page/all-job-page.component';
import { JobDataPageComponent } from './pages/job-data-page/job-data-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/global-settings', 
    pathMatch: 'full',
  },
  {
    path: 'global-settings',
    component: GlobalPageComponent,
  },
  {
    path: 'job-settings',
    children:[
      { path: '', component: JobPageComponent},
      { path: ':id', component: JobDataPageComponent},
    ] 
  },
  {
    path: 'all-jobs',
    component: AllJobPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
