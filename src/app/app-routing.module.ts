import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { GlobalPageComponent } from './global-page/global-page.component';
import { JobPageComponent } from './job-page/job-page.component';
import { AllJobPageComponent } from './all-job-page/all-job-page.component';

   
const routes: Routes = [
  {
      path: '',
      redirectTo: 'global-settings', 
      pathMatch: 'full'
  },
  {
    path: 'global-settings',
    component: GlobalPageComponent,
  },
  {
    path: 'job-settings',
    component: JobPageComponent,
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
