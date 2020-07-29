import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  host = '131.225.154.146'

  constructor() {
    this.host = '131.225.154.146'
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
      xhr.timeout = 60000; // Set timeout to 4 seconds (4000 milliseconds) 
      xhr.ontimeout = function () { 
        reject({
          "serverError": true,
          "notFound": false
        })
      }
      xhr.send();
    })  
  }

  public async getAllJobs(jobs, filters, start) {

    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              var response = JSON.parse(this.responseText)

              if (filters.length > 0) {
                resolve(response);  
              }
              else {
                //console.log("returning all jobs")
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
      xhr.timeout = 10000; // Set timeout to 4 seconds (4000 milliseconds) 
      xhr.ontimeout = function () { 
        reject({
          "serverError": true,
          "notFound": false
        })
      }
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
      xhr.timeout = 10000; // Set timeout to 4 seconds (4000 milliseconds) 
      xhr.ontimeout = function () { 
        reject({
          "serverError": true,
          "notFound": false
        })
      }
      xhr.send();
    })  
  }

  public async getChannelData(channel) {
    return new Promise(function(resolve, reject) {

      var file = this.getFileName(channel)
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

      xhr.open("GET", 'https://131.225.154.146:5002/get-resource/' + file, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.timeout = 10000; // Set timeout to 4 seconds (4000 milliseconds) 
      xhr.ontimeout = function () { 
        reject({
          "serverError": true,
          "notFound": false
        })
      }
      xhr.send();
    })  
  }

  public async postNewJobData(details) {
    return new Promise(function(resolve, reject) {
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
      xhr.timeout = 10000; // Set timeout to 4 seconds (4000 milliseconds) 
      xhr.ontimeout = function () { 
        reject({
          "serverError": true,
          "notFound": false
        })
      }
      xhr.send(JSON.stringify({
          "details": details
      }));
    })  
  }

  public async postNewChannelData(channel, details) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      var url = 'https://131.225.154.146:5002/update-channel'

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
      xhr.timeout = 10000; // Set timeout to 4 seconds (4000 milliseconds) 
      xhr.ontimeout = function () { 
        reject({
          "serverError": true,
          "notFound": false
        })
      }
      
      xhr.send(JSON.stringify({
          "file": this.getFileName(channel),
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
      xhr.timeout = 10000; // Set timeout to 4 seconds (4000 milliseconds) 
      xhr.ontimeout = function () { 
        reject({
          "serverError": true,
          "notFound": false
        })
      }
      xhr.send();

    })
  }

  private getFileName(channel) {
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
    
    return file;
  }
}