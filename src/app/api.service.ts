import { Injectable } from '@angular/core';
import ChannelNames from '../assets/channel-list.json';
import GceTransforms from '../assets/gce-transforms.json';
import NerscTransforms from '../assets/nersc-transforms.json';
import AwsTransforms from '../assets/aws-calc-transforms.json';


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
      case 'nersc': {
        return NerscTransforms;
        break;
      }
      case 'aws_calculations_with_source_proxy': {
        return AwsTransforms;
        break;
      }
      case 'resource_request': {
        return [];
        break;
      }
    }
  }
}