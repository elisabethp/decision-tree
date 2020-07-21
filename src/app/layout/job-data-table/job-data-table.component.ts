import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-job-data-table',
  templateUrl: './job-data-table.component.html',
  styleUrls: ['./job-data-table.component.css']
})
export class JobDataTableComponent implements OnInit {

  @Output() fetchJobs = new EventEmitter();
  @Input() jobs: any = 'default';
  column_names = null;

  constructor() { }

  ngOnInit(): void {
    this.column_names = this.jobs.columns
  }

  getValues(obj){
    return Object.values(obj)
  }

  positionTooltip(e) {
    var tooltipSpan: any;
    tooltipSpan = document.getElementsByClassName('tr-tooltip')[0];
    var x = e.clientX,
        y = e.clientY;
        
    tooltipSpan.style.position = 'fixed';
    tooltipSpan.style.display = 'inline-block';
    tooltipSpan.style.top = (y + 10) + "px";
    tooltipSpan.style.left = (x + 10) + "px";
  }

  removeTooltip() {
    var tooltipSpan: any;
    tooltipSpan = document.getElementsByClassName('tr-tooltip')[0];
    tooltipSpan.style.display = 'none';
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
