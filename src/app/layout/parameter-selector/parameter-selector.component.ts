import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-parameter-selector',
  templateUrl: './parameter-selector.component.html',
  styleUrls: ['./parameter-selector.component.css']
})
export class ParameterSelectorComponent implements OnInit {

  //@Output() selectItemTrigger = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
}
