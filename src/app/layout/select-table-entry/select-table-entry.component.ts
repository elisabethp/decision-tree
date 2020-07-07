import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-table-entry',
  templateUrl: './select-table-entry.component.html',
  styleUrls: ['./select-table-entry.component.css']
})
export class SelectTableEntryComponent implements OnInit {

  @Input() name: string = 'default';

  constructor() { }

  ngOnInit(): void {
  }

}
