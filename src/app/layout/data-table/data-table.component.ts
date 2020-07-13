import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input() job: string = 'default';
  job_keys = null;
  column_names = ["Classad", "Value"]

  constructor() { }

  edit() {
    console.log('data-table');
  }

  ngOnInit():void{
    this.job_keys = Object.keys(this.job)
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

}
