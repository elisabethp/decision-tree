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

    console.log(target);
    console.log(data_table);

    if (target.classList.contains('fa-minus')) { //it is expanded
      console.log('ok')
      document.getElementById(data_table).style.display = 'none';
      target.classList.remove('fa-minus');
      target.classList.add('fa-plus');
    } 
    else if (target.classList.contains('fa-plus')) { //it is collapsed
      console.log("no")
      document.getElementById(data_table).style.display = 'block';
      target.classList.add('fa-minus');
      target.classList.remove('fa-plus');
    }
    else {
      return;
    }

  }
}
