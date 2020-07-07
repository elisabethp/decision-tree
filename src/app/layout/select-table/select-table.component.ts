import { Component, OnInit, Input } from '@angular/core';
import ExternalList from '../../../assets/external-list.json';
import InternalList from '../../../assets/internal-list.json';

@Component({
  selector: 'app-select-table',
  templateUrl: './select-table.component.html',
  styleUrls: ['./select-table.component.css']
})
export class SelectTableComponent implements OnInit {

  @Input() data: string = 'default';
  list = null

  constructor() { }

  ngOnInit(): void {
    this.list = this.data == "external" ? ExternalList.data : InternalList.data;
  }

}
