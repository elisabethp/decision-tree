export function getXHR(url, request_type, resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open(request_type, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.timeout = 60000; // Set timeout to 1 minute (60000 milliseconds) 
    xhr.onerror = function() {
      reject({
        "serverError": true,
        "notFound": false
      })
    }
    xhr.ontimeout = function () { 
      reject({
        "serverError": true,
        "notFound": false
      })
    }

    return xhr;
}

export function getHost() {
    return '131.225.154.146:5002';    
}

export function fileSwitcher(channel) {
    switch (channel.toLowerCase()) {
        case 'gce': {
          return 'gce-transforms';
        }
        case 'nersc': {
          return 'nersc-transforms';
        }
        case 'aws_calculations_with_source_proxy': {
          return 'aws-calc-transforms';
        }
        default: {
          return [];
        }
    }
}