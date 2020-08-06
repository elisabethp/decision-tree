import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { APIService } from '../api/api.service';

@Component({
  selector: 'app-global-page',
  templateUrl: './global-page.component.html',
  styleUrls: ['./global-page.component.css']
})
export class GlobalPageComponent implements OnInit {

  @HostListener('document:global-page-reload', ['$event'])
  onGlobalClick(ev: any) { this.pullPageData() }

  @Output() openModalTrigger = new EventEmitter<string>();
  
  channelNames = null;
  selectedChannel = null;
  
  isLoaded = false;
  notFound = false; //doesn't apply here
  serverError = false;

  constructor(private api : APIService) {
    this.pullPageData()
  }

  ngOnInit(): void {}


  goToChannel(event) {
    var target = event.target;
    var channel_index = target.getAttribute("channel");
    this.selectedChannel = this.channelNames.data[channel_index];
  }

  pullPageData() {
    this.isLoaded = false;

    this.api.getChannelNames()
      .then((channels) => {
        this.channelNames = channels
        this.selectedChannel = this.channelNames.data[0];
        this.isLoaded = true;
      })
      .catch((error) => {
        console.log(error)
        this.notFound = error["notFound"]
        this.serverError = error["serverError"]
      });
  }

}
