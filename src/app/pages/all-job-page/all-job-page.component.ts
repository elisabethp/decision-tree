import { Component, OnInit, HostListener, Input } from '@angular/core';
import { APIService } from 'src/app/api/api.service';
import { LoadingComponent } from 'src/app/shared/loading.component'

@Component({
  selector: 'app-all-job-page',
  templateUrl: './all-job-page.component.html',
  styleUrls: ['./all-job-page.component.css', '/src/app/shared/page.component.css']
})

export class AllJobPageComponent extends LoadingComponent implements OnInit  {
  
  all_jobs = null;
  filtered_jobs = null;
  filters = []

  itemIcon = "fa fa-times"

  constructor(private api : APIService) { 
    super()
    this.api.getAllJobs(null, [], 0)
      .then((data) => {
        this.all_jobs = data;
        this.filtered_jobs = data;

        this.isLoaded = true;
        this.isJobsLoaded = true;
      })
      .catch((error) => {
        this.notFound = error["notFound"]
        this.serverError = error["serverError"]
      })
  }

  ngOnInit(): void {}

  addFilter() {
    var event = new CustomEvent(
      'global-click',
      { detail: {
          'switch-key': 'add-job-filter',
          'filters': this.filters,
        } 
      }
    );
  
    document.dispatchEvent(event);
  }

  removeFilter(index) {
    this.filters.splice(index, 1);
    this.isJobsLoaded = false;
    
    this.api.getAllJobs(null, this.filters, 0)
      .then((data) => {
        this.filtered_jobs = data;
        this.isJobsLoaded = true;
      })
      .catch((error) => {
        this.jobsNotFound = error["notFound"]
        this.jobsServerError = error["serverError"]
      })
  }

  getFilterName(filter) {
    return filter.key + " = " + filter.value;
  }

  fetchMoreJobs(count) {
    this.api.getAllJobs(null, this.filters, count+1)
      .then((data) => {

        for (var i = 0; i < data["data"].length; i++) {
          this.filtered_jobs["data"].push(data["data"][i]);
        }
        
        this.isJobsLoaded = true;
      })
      .catch((error) => {
        this.jobsNotFound = error["notFound"]
        this.jobsServerError = error["serverError"]
      })
  }

  pullPageData() {
    this.api.getAllJobs(null, this.filters, 0)
      .then((data) => {
        this.all_jobs = data;
        this.filtered_jobs = data;
        this.isJobsLoaded = true
      })
      .catch((error) => {
        this.jobsNotFound = error["notFound"]
        this.jobsServerError = error["serverError"]
      })
  }

  /* EVENT LISTENER */
  @HostListener('document:all-job-page-click', ['$event'])
  onClick(ev: any) {
    switch(ev.detail['switch-key']) {
      case 'update-filters': {
        this.filters = ev.detail['filters']
        this.isJobsLoaded = false;

        this.pullPageData();
        break;
      }
    }
  }
}
