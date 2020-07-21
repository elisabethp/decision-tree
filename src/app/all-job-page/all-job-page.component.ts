import { Component, OnInit, HostListener, Input } from '@angular/core';
import { APIService } from '../api/api.service';

@Component({
  selector: 'app-all-job-page',
  templateUrl: './all-job-page.component.html',
  styleUrls: ['./all-job-page.component.css']
})

export class AllJobPageComponent implements OnInit  {
  
  @HostListener('document:all-job-page-click', ['$event'])
  onClick(ev: any) {
    //console.log(ev);
    switch(ev.detail['switch-key']) {
      case 'update-filters': {
        //console.log(ev.detail)
        this.filters = ev.detail['filters']
        this.isJobsLoaded = false;

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
        break;
      }
    }
  }

  isLoaded = false;
  notFound = false; //doesn't apply here
  serverError = false;

  isJobsLoaded = false;
  jobsNotFound = false; //doesn't apply here
  jobsServerError = false;
  

  all_jobs = null;
  filtered_jobs = null;
  filters = []

  itemIcon = "fa fa-times"

  constructor(private api : APIService) { 
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
    //console.log(filter)
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
}
