import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Table } from 'src/app/shared/table.component';

@Component({
  selector: 'app-all-job-data-table',
  templateUrl: './all-job-data-table.component.html',
  styleUrls: ['./all-job-data-table.component.css', '/src/app/shared/table.component.css']
})

export class AllJobDataTableComponent extends Table implements OnInit {

  @Output() fetchJobs = new EventEmitter();
  @Input() jobs: any = 'default';
  column_names = null;

  constructor() { super() }

  ngOnInit(): void {
    this.column_names = this.jobs.columns
  }

  goToJob(job) {
    var event = new CustomEvent(
      'global-click',
      { detail: {
          'switch-key': 'go-to-job',
          'url': '/job-settings/' + job.JOBSUBJOBID 
        } 
      }
    );
  
    document.dispatchEvent(event);
  }

  scrolled(o){
    o = o.target;
    if(o.offsetHeight + o.scrollTop == o.scrollHeight) {
      this.fetchJobs.emit(this.jobs.data.length);
    }
}
}
