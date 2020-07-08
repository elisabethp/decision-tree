import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageTabComponent } from './layout/page-tab/page-tab.component';
import { DataTableComponent } from './layout/data-table/data-table.component';
import { GlobalPageComponent } from './global-page/global-page.component';
import { JobPageComponent } from './job-page/job-page.component';
import { AllJobPageComponent } from './all-job-page/all-job-page.component';
import { JobDataPageComponent } from './job-data-page/job-data-page.component';
import { JobDataTableComponent } from './layout/job-data-table/job-data-table.component';
import { ModifyPopupComponent } from './layout/modify-popup/modify-popup.component';
import { FilterPopupComponent } from './layout/filter-popup/filter-popup.component';
import { DecisionPopupComponent } from './layout/decision-popup/decision-popup.component';
import { TableComponent } from './layout/table/table.component';
import { ChannelDataComponent } from './layout/channel-data/channel-data.component';
import { ItemRowComponent } from './layout/item-row/item-row.component';

@NgModule({
  declarations: [
    AppComponent,
    PageTabComponent,
    DataTableComponent,
    GlobalPageComponent,
    JobPageComponent,
    AllJobPageComponent,
    JobDataPageComponent,
    JobDataTableComponent,
    ModifyPopupComponent,
    FilterPopupComponent,
    DecisionPopupComponent,
    TableComponent,
    ChannelDataComponent,
    ItemRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
