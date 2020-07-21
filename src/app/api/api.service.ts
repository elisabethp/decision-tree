import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  host = '131.225.154.146'

  constructor() {
    this.host = '131.225.154.146'
    //this.host = 'localhost'
  }

  public async getJobDetails(jobID) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              var response = JSON.parse(this.responseText)
            
              for (var i = 0; i < response.length; i++) {
                if (response[i]["jobsubjobid"] ==  '"' + jobID + '"') {
                  resolve(response[i]);
                } 
              }

              reject({
                "serverError": false,
                "notFound": true
              })
          }
          
          if (this.readyState == 4 && this.status == 500) {
            reject({
                "serverError": true,
                "notFound": false
            })
          }
      };

      xhr.open("GET", 'https://131.225.154.146:5002/get-resource/job-data', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();
    })  
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

  public async getAllJobs(jobs, filters, start) {

    /*var filterString = '';

    for (var filter in filters) {
      var currFilter = filters[filter]

      if (filter != '0') {
        filterString = filterString + " & ";
      }

      filterString = filterString + currFilter.key + ' == "' + currFilter.value + '"';
    }

    console.log(filterString);*/

    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              var response = JSON.parse(this.responseText)

              if (filters.length > 0) {
                resolve(response);  
              }
              else {
                console.log("returning all jobs")
                resolve(response);
              }
              
          }

          if (this.readyState == 4 && this.status == 500) {
            reject({
                "serverError": true,
                "notFound": false
            })
          }

      };

      xhr.open("POST", 'https://131.225.154.146:5002/jobs/', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        "start": start,
        "count": 20,
        "filters": filters
      }));
    })  
  }

  public async getChannelNames() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText)
              //console.log(this.responseText);
              resolve(JSON.parse(this.responseText))          
          }

          if (this.readyState == 4 && this.status == 500) {
            reject({
                "serverError": true,
                "notFound": false
            })
          }
      };

      xhr.open("GET", 'https://131.225.154.146:5002/get-resource/channel-list', true);

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();
    })  
  }

  public async getChannelData(channel) {
    return new Promise(function(resolve, reject) {

      var file = '';

      switch (channel.toLowerCase()) {
        case 'gce': {
          file = 'gce-transforms';
          break;
        }
        case 'nersc': {
          file = 'nersc-transforms';
          break;
        }
        case 'aws_calculations_with_source_proxy': {
          file = 'aws-calc-transforms';
          break;
        }
        case 'resource_request': {
          //return [];
          break;
        }
      }

      console.log("get the channelsssss")

      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
          console.log("get the channelsssss")

          if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
              resolve(JSON.parse(this.responseText))
          }
          
          if (this.readyState == 4 && this.status == 500) {
            reject({
                "serverError": true,
                "notFound": false
            })
          }
      };

      xhr.open("GET", 'https://131.225.154.146:5002/get-resource/' + file, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();
    })  
  }

  public async postNewJobData(source, details) {
    return new Promise(function(resolve, reject) {
      console.log(details)
      var xhr = new XMLHttpRequest();
      var url = 'https://131.225.154.146:5002/update-job'

      xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(true)
            }
            
            if (this.readyState == 4 && this.status == 500) {
              reject({
                  "serverError": true,
                  "notFound": false
              })
            }
        };

      xhr.open("POST", url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
          "source": source,
          "details": details
      }));
    })  
  }

  public async getUserInfo() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(JSON.parse(this.responseText))
            }
            
            if (this.readyState == 4 && this.status == 500) {
              reject({
                  "serverError": true,
                  "notFound": false
              })
            }
        };

      xhr.open("GET", 'https://fermicloud013.fnal.gov/Shibboleth.sso/Session', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();

    })
  }
}