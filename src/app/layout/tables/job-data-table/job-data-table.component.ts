import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/shared/table.component';

@Component({
  selector: 'app-job-data-table',
  templateUrl: './job-data-table.component.html',
  styleUrls: ['./job-data-table.component.css', '/src/app/shared/table.component.css']
})
export class JobDataTableComponent extends Table implements OnInit {

  @Input() job: string = 'default';
  job_keys = null;
  column_names = ["ClassAd", "Value"]

  constructor() { super() }

  editRow(classad_key) {
    var clicked_item = this.job[classad_key];

    var event = new CustomEvent(
      'global-click',
      { detail: {
          'switch-key': 'job-edit-row',
          'action': 'edit',
          'job-row': {
              "id": this.job['jobsubjobid'],
              "key": classad_key,
              "value": clicked_item
          },
        } 
      }
    );
  
    document.dispatchEvent(event);
  }

  ngOnInit():void{
    this.job_keys = Object.keys(this.job)
  }

}
