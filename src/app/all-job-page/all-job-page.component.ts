import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-all-job-page',
  templateUrl: './all-job-page.component.html',
  styleUrls: ['./all-job-page.component.css']
})

export class AllJobPageComponent implements OnInit {

  all_jobs = null;
  filtered_jobs = null;
  filters = []

  constructor(private api : APIService) { 
    this.all_jobs = this.api.getAllJobs();
    this.filtered_jobs = this.all_jobs;
  }

  ngOnInit(): void {
  }

  addFilter() {

  }
  
  removeFilter(event) {

  }

}
