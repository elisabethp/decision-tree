import { Component, OnInit, HostListener } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-all-job-page',
  templateUrl: './all-job-page.component.html',
  styleUrls: ['./all-job-page.component.css']
})

export class AllJobPageComponent implements OnInit  {
  
  @HostListener('document:all-job-page-click', ['$event'])
  onClick(ev: any) {
    console.log(ev);
    switch(ev.detail['switch-key']) {
      case 'update-filters': {
        console.log(ev.detail)
        this.filters = ev.detail['filters']
        this.filtered_jobs = this.api.getAllJobs(null, this.filters);
        break;
      }
    }
  }

  all_jobs = null;
  filtered_jobs = null;
  filters = []

  constructor(private api : APIService) { 
    this.all_jobs = this.api.getAllJobs(null, []);
    this.filtered_jobs = this.all_jobs;
  }

  ngOnInit(): void {
  }

  addFilter() {
    var event = new CustomEvent(
      'global-click',
      { detail: {
          'switch-key': 'add-job-filter',
          'filters': this.filters
        } 
      }
    );
  
    document.dispatchEvent(event);
  }

  removeFilter(event, index) {
    this.filters.splice(index, 1);
    this.filtered_jobs = this.api.getAllJobs(null, this.filters);
    console.log(this.filters)
    console.log(this.filtered_jobs)

  }

  getFilterName(filter) {
    //console.log(filter)
    return filter.key + " = " + filter.value;
  }
}
