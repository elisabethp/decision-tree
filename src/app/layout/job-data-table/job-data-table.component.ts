import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job-data-table',
  templateUrl: './job-data-table.component.html',
  styleUrls: ['./job-data-table.component.css']
})
export class JobDataTableComponent implements OnInit {

  @Input() jobs: any = 'default';
  column_names = ["id", "description"]

  constructor() { }

  ngOnInit(): void {
    //console.log(this.jobs.data)
  }

  getValues(obj){
    return Object.values(obj)
  }

  goToJob(job) {
    var event = new CustomEvent(
      'global-click',
      { detail: {
          'switch-key': 'go-to-job',
          'url': '/job-settings/' + job.id 
        } 
      }
    );
  
    document.dispatchEvent(event);
  }
}
