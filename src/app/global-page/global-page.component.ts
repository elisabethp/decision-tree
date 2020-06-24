import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-global-page',
  templateUrl: './global-page.component.html',
  styleUrls: ['./global-page.component.css']
})
export class GlobalPageComponent implements OnInit {

  @Output() openModalTrigger = new EventEmitter<string>();

  constructor() {

  }

  edit() {
    console.log('global page');
    this.openModalTrigger.emit('modify');
  }

  ngOnInit(): void {
  }

}
