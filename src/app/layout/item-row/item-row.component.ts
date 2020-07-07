import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-row',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.css']
})
export class ItemRowComponent implements OnInit {
  
  @Input() name: string = 'default';

  constructor() { }

  ngOnInit(): void {
  }

}
