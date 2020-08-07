import { Component, OnInit, Input } from '@angular/core';
import { APIService } from 'src/app/api/api.service';
import { Table } from 'src/app/shared/table.component';

@Component({
  selector: 'app-global-table',
  templateUrl: './global-table.component.html',
  styleUrls: ['./global-table.component.css', '/src/app/shared/table.component.css']
})

export class GlobalTableComponent extends Table implements OnInit  {
  @Input() table_data: string = 'default';

  channel = null;
  list = null;
  column_names = null;

  constructor(private api : APIService) { super() }

  ngOnInit(): void {
    this.column_names = this.list.column_names;
  }

  toggleShow(event) {
    var target = event.target;
    var data_table = target.getAttribute('data-table');

    if (target.classList.contains('fa-minus')) { //table is expanded
      document.getElementById(data_table).style.display = 'none';
      target.classList.remove('fa-minus');
      target.classList.add('fa-plus');
    } 
    else if (target.classList.contains('fa-plus')) { //table is collapsed
      document.getElementById(data_table).style.display = 'table';
      target.classList.add('fa-minus');
      target.classList.remove('fa-plus');
    }
    else {
      return;
    }
  }

  editRow(row, index) {
    var event = new CustomEvent(
      'global-click',
      { detail: {
          'switch-key': 'channel-edit-row',
          'channel': this.channel, 
          'table_name': this.list.name,
          'column_names': this.column_names, 
          'row': row,
          'index': index
        } 
      }
    );
  
    document.dispatchEvent(event);
  }
}
