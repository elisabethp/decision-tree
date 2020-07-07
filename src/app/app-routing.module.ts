import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { GlobalPageComponent } from './global-page/global-page.component';
import { JobPageComponent } from './job-page/job-page.component';
import { AllJobPageComponent } from './all-job-page/all-job-page.component';
import { JobDataPageComponent } from './job-data-page/job-data-page.component';
import { GlobalDataPageComponent } from './global-data-page/global-data-page.component';

   
const routes: Routes = [
  {
      path: '',
      redirectTo: '/global-settings', 
      pathMatch: 'full'
  },
  {
    path: 'global-settings',
    children:[
      { path: '', component: GlobalPageComponent},
      { path: ':product-name', component: GlobalDataPageComponent},
    ] 
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
