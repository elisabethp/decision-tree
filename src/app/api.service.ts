import { Injectable } from '@angular/core';
import ChannelNames from '../assets/channel-list.json';
import GceTransforms from '../assets/gce-transforms.json';


@Injectable({
  providedIn: 'root'
})

export class APIService {

  constructor() { 

  }

  public getChannelNames() {
    return ChannelNames;
  }

  public getChannelData(channel) {
    switch (channel.toLowerCase()) {
      case 'gce': {
        return GceTransforms;
        break;
      }
      case 'resource_request': {
        return [];
        break;
      }
    }
  }
}