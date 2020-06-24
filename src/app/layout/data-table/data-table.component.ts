import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Output() openModalTrigger = new EventEmitter<string>();

  constructor() { }

  edit() {
    console.log('data-table');
    this.openModalTrigger.emit('modify');
  }

  ngOnInit(): void {
  }

}
