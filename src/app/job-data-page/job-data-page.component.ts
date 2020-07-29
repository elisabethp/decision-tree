import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { APIService } from '../api/api.service';

@Component({
  selector: 'app-job-data-page',
  templateUrl: './job-data-page.component.html',
  styleUrls: ['./job-data-page.component.css']
})
export class JobDataPageComponent implements OnInit {

  @HostListener('document:job-data-page-reload', ['$event'])
  onGlobalClick(ev: any) { this.pullPageData() }

  routeSub = null;
  id = null;

  job_data = null;

  isLoaded = false;
  notFound = false;
  serverError = false;

  constructor(private route: ActivatedRoute, private api: APIService) { 
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.pullPageData()
    })
  }

  ngOnInit() {}

  addRow() {
    var event = new CustomEvent(
      'global-click',
      { detail: {
          'switch-key': 'job-edit-row',
          'action': 'add',
          'job-row': {
              "id": this.job_data["jobsubjobid"]
          },
        } 
      }
    );
  
    document.dispatchEvent(event);
  }

  pullPageData() {
    this.isLoaded = false;

    this.api.getJobDetails(this.id)
      .then((data) => {
        //console.log(data)
        this.job_data = data;
        this.isLoaded = true;
      })
      .catch((error) => {
        this.notFound = error["notFound"]
        this.serverError = error["serverError"]
      })
  }

}
