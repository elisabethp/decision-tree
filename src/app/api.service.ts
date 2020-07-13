import { Injectable } from '@angular/core';
import ChannelNames from '../assets/channel-list.json';
import GceTransforms from '../assets/gce-transforms.json';
import NerscTransforms from '../assets/nersc-transforms.json';
import AwsTransforms from '../assets/aws-calc-transforms.json';
import AllJobs from '../assets/all-jobs.json';
import JobData from '../assets/job-data.json';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  constructor() { 

  }

  public getJobDetails(jobID) {
    for (var i = 0; i < JobData.length; i++) {
      if (JobData[i]["jobsubjobid"] == '"' + jobID + '"') {
        return JobData[i];
      } 
    }
  }

  private filterJobs(jobs, filters) {
    
    var result = {
      "count": jobs["count"],
      "columns": jobs["columns"],
      "data": []
    }

    for (var job in jobs["data"]) {
      var currJob = jobs["data"][job]
      var jobMetdata = this.getJobDetails(currJob['JOBSUBJOBID'])
      var passesFilters = false;

      for (var filter in filters) {
        var currFilter = filters[filter]
        
        if (jobMetdata.hasOwnProperty(currFilter.key) && jobMetdata[currFilter.key] == currFilter.value){
          passesFilters = true
        }
        else {
          passesFilters = false
          break;
        }
      }

      if (passesFilters) {
        result['data'].push(currJob)
      }

    }
   
    return result;
  }

  public getAllJobs(jobs, filter) {

    if (filter.length > 0) {
      return this.filterJobs(AllJobs, filter);
    }
    else {
      console.log("returning all jobs")
      return AllJobs;
    }
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