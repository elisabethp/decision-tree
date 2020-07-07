import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { APIService } from '../../api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  @Input() table_data: string = 'default';
  @HostBinding('class.display-50') display50: boolean = false;

  list = null
  column_names = null;

  constructor(private api : APIService) { 

  }

  ngOnInit(): void {
    this.column_names = this.list.column_names;

    if (this.column_names.length < 5) {
      this.display50 = true;
    }
  }

  getValues(obj){
    return Object.values(obj)
  }

}
