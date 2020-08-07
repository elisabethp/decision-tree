import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// -- PAGES
import { GlobalPageComponent } from 'src/app/pages/global-page/global-page.component';
import { JobPageComponent } from 'src/app/pages/job-page/job-page.component';
import { AllJobPageComponent } from 'src/app/pages/all-job-page/all-job-page.component';
import { JobDataPageComponent } from 'src/app/pages/job-data-page/job-data-page.component';

// -- TABLES
import { JobDataTableComponent } from 'src/app/layout/tables/job-data-table/job-data-table.component';
import { AllJobDataTableComponent } from 'src/app/layout/tables/all-job-data-table/all-job-data-table.component';
import { GlobalTableComponent } from 'src/app/layout/tables/global-table/global-table.component';

// -- POPUPS
import { ModifyGlobalPopupComponent } from 'src/app/layout/popups/modify-global-popup/modify-global-popup.component';
import { FilterPopupComponent } from 'src/app/layout/popups/filter-popup/filter-popup.component';
import { ModifyJobPopupComponent } from 'src/app/layout/popups/modify-job-popup/modify-job-popup.component';

// -- COMPONENTS
import { PageTabComponent } from 'src/app/layout/page-tab/page-tab.component';
import { ChannelDataComponent } from 'src/app/layout/channel-data/channel-data.component';
import { ItemRowComponent } from 'src/app/layout/item-row/item-row.component';
import { PageStateComponent } from 'src/app/layout/page-state/page-state.component';

@NgModule({
  declarations: [
    AppComponent,
    PageTabComponent,
    JobDataTableComponent,
    GlobalPageComponent,
    JobPageComponent,
    AllJobPageComponent,
    JobDataPageComponent,
    AllJobDataTableComponent,
    ModifyGlobalPopupComponent,
    FilterPopupComponent,
    GlobalTableComponent,
    ChannelDataComponent,
    ItemRowComponent,
    ModifyJobPopupComponent,
    PageStateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
