import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageTabComponent } from './page-tab/page-tab.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ParameterSelectorComponent } from './parameter-selector/parameter-selector.component';
import { FilterSelectorComponent } from './filter-selector/filter-selector.component';
import { SearchIdComponent } from './search-id/search-id.component';
import { DataTableEntryComponent } from './data-table-entry/data-table-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    PageTabComponent,
    DataTableComponent,
    ParameterSelectorComponent,
    FilterSelectorComponent,
    SearchIdComponent,
    DataTableEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
