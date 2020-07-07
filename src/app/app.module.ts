import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageTabComponent } from './layout/page-tab/page-tab.component';
import { DataTableComponent } from './layout/data-table/data-table.component';
import { ParameterSelectorComponent } from './layout/parameter-selector/parameter-selector.component';
import { FilterSelectorComponent } from './layout/filter-selector/filter-selector.component';
import { DataTableEntryComponent } from './layout/data-table-entry/data-table-entry.component';
import { ParameterSelectorEntryComponent } from './layout/parameter-selector-entry/parameter-selector-entry.component';
import { GlobalPageComponent } from './global-page/global-page.component';
import { JobPageComponent } from './job-page/job-page.component';
import { AllJobPageComponent } from './all-job-page/all-job-page.component';
import { JobDataPageComponent } from './job-data-page/job-data-page.component';
import { FilterSelectorEntryComponent } from './layout/filter-selector-entry/filter-selector-entry.component';
import { JobDataTableComponent } from './layout/job-data-table/job-data-table.component';
import { JobDataTableEntryComponent } from './layout/job-data-table-entry/job-data-table-entry.component';
import { ModifyPopupComponent } from './layout/modify-popup/modify-popup.component';
import { FilterPopupComponent } from './layout/filter-popup/filter-popup.component';
import { DecisionPopupComponent } from './layout/decision-popup/decision-popup.component';
import { SelectTableComponent } from './layout/select-table/select-table.component';
import { SelectTableEntryComponent } from './layout/select-table-entry/select-table-entry.component';
import { GlobalDataPageComponent } from './global-data-page/global-data-page.component';
import { TableComponent } from './layout/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    PageTabComponent,
    DataTableComponent,
    ParameterSelectorComponent,
    FilterSelectorComponent,
    DataTableEntryComponent,
    ParameterSelectorEntryComponent,
    GlobalPageComponent,
    JobPageComponent,
    AllJobPageComponent,
    JobDataPageComponent,
    FilterSelectorEntryComponent,
    JobDataTableComponent,
    JobDataTableEntryComponent,
    ModifyPopupComponent,
    FilterPopupComponent,
    DecisionPopupComponent,
    SelectTableComponent,
    SelectTableEntryComponent,
    GlobalDataPageComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
