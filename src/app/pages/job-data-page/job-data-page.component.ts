import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { APIService } from 'src/app/api/api.service';
import { LoadingComponent } from 'src/app/shared/loading.component'

@Component({
  selector: 'app-job-data-page',
  templateUrl: './job-data-page.component.html',
  styleUrls: ['./job-data-page.component.css', '/src/app/shared/page.component.css']
})
export class JobDataPageComponent extends LoadingComponent implements OnInit {

  routeSub = null;
  id = null;

  job_data = null;

  constructor(private route: ActivatedRoute, private api: APIService) { 
    super()
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
        this.job_data = data;
        this.isLoaded = true;
      })
      .catch((error) => {
        this.notFound = error["notFound"]
        this.serverError = error["serverError"]
      })
  }

    /* EVENT LISTENER */
    @HostListener('document:job-data-page-reload', ['$event'])
    onClick(ev: any) { this.pullPageData() }

}
