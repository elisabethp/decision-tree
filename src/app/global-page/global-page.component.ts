import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-global-page',
  templateUrl: './global-page.component.html',
  styleUrls: ['./global-page.component.css']
})
export class GlobalPageComponent implements OnInit {

  @Output() openModalTrigger = new EventEmitter<string>();
  channelNames = null;

  constructor(private api : APIService) {
    this.channelNames = api.getChannelNames();
  }

  ngOnInit(): void {}

  ngAfterViewInit()	{}

}
