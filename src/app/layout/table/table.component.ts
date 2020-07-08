import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  @Input() table_data: string = 'default';

  list = null
  column_names = null;

  constructor(private api : APIService) {}

  ngOnInit(): void {
    this.column_names = this.list.column_names;
  }

  getValues(obj){
    return Object.values(obj)
  }

  toggleShow(event) {
    var target = event.target;
    var data_table = target.getAttribute('data-table');

    if (target.classList.contains('fa-minus')) { //table is expanded
      console.log('ok')
      document.getElementById(data_table).style.display = 'none';
      target.classList.remove('fa-minus');
      target.classList.add('fa-plus');
    } 
    else if (target.classList.contains('fa-plus')) { //table is collapsed
      console.log("no")
      document.getElementById(data_table).style.display = 'table';
      target.classList.add('fa-minus');
      target.classList.remove('fa-plus');
    }
    else {
      return;
    }
  }

  positionTooltip(e) {
    var tooltipSpan = document.getElementsByClassName('tr-tooltip')[0];
    var x = e.clientX,
        y = e.clientY;
        
    tooltipSpan.style.position = 'fixed';
    tooltipSpan.style.display = 'inline-block';
    tooltipSpan.style.top = (y + 10) + "px";
    tooltipSpan.style.left = (x + 10) + "px";
  }

  removeTooltip() {
    var tooltipSpan = document.getElementsByClassName('tr-tooltip')[0];
    tooltipSpan.style.display = 'none';
  }
}
