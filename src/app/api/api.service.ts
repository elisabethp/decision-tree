import { Injectable } from '@angular/core';
import { getHost, fileSwitcher, getXHR } from 'src/app/api/api.helpers';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  constructor() {}

  public getJobDetails(jobID) {
    return new Promise(function(resolve, reject) {
      var url = 'https://' + getHost() + '/get-resource/job-data'
      var request_type = "POST"
      var xhr = getXHR(url, request_type, resolve, reject);


      xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              var response = JSON.parse(this.responseText)
            
              /*for (var i = 0; i < response.length; i++) {
                if (response[i]["jobsubjobid"] ==  '"' + jobID + '"') {
                  resolve(response[i]);
                } 
              }*/
              if (response["found"]) {
                resolve(response["data"])
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

      xhr.send(JSON.stringify({
        "jobsubjobid": jobID
      }));
    })  
  }

  public getAllJobs(jobs, filters, start) {
    return new Promise(function(resolve, reject) {
      var url = 'https://' + getHost() + '/jobs/'
      var request_type = "POST"
      var xhr = getXHR(url, request_type, resolve, reject);

      xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              var response = JSON.parse(this.responseText)

              if (filters.length > 0) {
                resolve(response);  
              }
              else {
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

      xhr.send(JSON.stringify({
        "start": start,
        "count": 20,
        "filters": filters
      }));
    })  
  }

  public getChannelNames() {
    return new Promise(function(resolve, reject) {
      var url = 'https://' + getHost() + '/get-resource/channel-list'
      var request_type = "GET"
      var xhr = getXHR(url, request_type, resolve, reject);

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

      xhr.send();
    })  
  }

  public getChannelData(channel) {
    return new Promise(function(resolve, reject) {
      var url = 'https://' + getHost() + '/get-resource/' + fileSwitcher(channel)
      var request_type = "GET"
      var xhr = getXHR(url, request_type, resolve, reject);

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

      xhr.send();
    })  
  }

  public postNewJobData(details) {
    return new Promise(function(resolve, reject) {
      var url = 'https://' + getHost() + '/update-job'
      var request_type = "POST"
      var xhr = getXHR(url, request_type, resolve, reject);

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

      xhr.send(JSON.stringify({
          "details": details
      }));
    })  
  }

  public postNewChannelData(channel, details) {
    return new Promise(function(resolve, reject) {
      var url = 'https://' + getHost() + '/update-channel'
      var request_type = "POST"
      var xhr = getXHR(url, request_type, resolve, reject);

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

      xhr.send(JSON.stringify({
          "file": fileSwitcher(channel),
          "details": details
      }));
    })  
  }

  public getUserInfo() {
    return new Promise(function(resolve, reject) {
      var url = 'https://fermicloud013.fnal.gov/Shibboleth.sso/Session'
      var request_type = "GET"
      var xhr = getXHR(url, request_type, resolve, reject);

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

      xhr.send();

    })
  }

}