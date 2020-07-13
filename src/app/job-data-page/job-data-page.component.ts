import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { APIService } from '../api.service';

@Component({
  selector: 'app-job-data-page',
  templateUrl: './job-data-page.component.html',
  styleUrls: ['./job-data-page.component.css']
})
export class JobDataPageComponent implements OnInit {

  routeSub = null;
  id = null;

  job_data = null;

  constructor(private route: ActivatedRoute, private api: APIService) { 
  
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'] //log the value of id
      this.job_data = this.api.getJobDetails(this.id)
    });
  }

}
