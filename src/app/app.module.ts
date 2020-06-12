import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageTabComponent } from './layout/page-tab/page-tab.component';
import { DataTableComponent } from './layout/data-table/data-table.component';
import { ParameterSelectorComponent } from './layout/parameter-selector/parameter-selector.component';
import { FilterSelectorComponent } from './layout/filter-selector/filter-selector.component';
import { SearchIdComponent } from './layout/search-id/search-id.component';
import { DataTableEntryComponent } from './layout/data-table-entry/data-table-entry.component';
import { ParameterSelectorEntryComponent } from './layout/parameter-selector-entry/parameter-selector-entry.component';
import { GlobalPageComponent } from './global-page/global-page.component';
import { JobPageComponent } from './job-page/job-page.component';
import { AllJobPageComponent } from './all-job-page/all-job-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PageTabComponent,
    DataTableComponent,
    ParameterSelectorComponent,
    FilterSelectorComponent,
    SearchIdComponent,
    DataTableEntryComponent,
    ParameterSelectorEntryComponent,
    GlobalPageComponent,
    JobPageComponent,
    AllJobPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
