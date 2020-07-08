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
  selectedChannel = null;

  constructor(private api : APIService) {
    this.channelNames = api.getChannelNames();
    this.selectedChannel = this.channelNames.data[0];
  }

  ngOnInit(): void {}

  goToChannel(event) {
    var target = event.target;
    var channel_index = target.getAttribute("channel");
    this.selectedChannel = this.channelNames.data[channel_index];
  }

}
