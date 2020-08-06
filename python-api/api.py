from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from json import dumps
import pandas as pd
import numpy as np
import json

app = Flask(__name__)
api = Api(app)

cors = CORS(app)

class UpdateJob(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        details = json_data['details']
        item = None

        print(details)
        with open('./assets/job-data.json') as json_file:
            data = json.load(json_file)
            
            for i in range(len(data)):
                if data[i]["jobsubjobid"] == details['id']:
                    job_index = i
                    break

            if details["action"] == "remove":
                del data[job_index][details['key']] 
            else:                
                data[job_index][details['key']] = details['value']

            item = data

        with open('./assets/job-data.json', 'w') as f:
            json.dump(item, f)

class UpdateChannel(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        file = json_data["file"]
        details = json_data['details']
        item = None

        print(details)
        with open('./assets/' + file + '.json') as json_file:
            data_wrapper = json.load(json_file)
            data = data_wrapper["data"]

            table_index = None

            #look for table name
            for i in range(len(data)):
                if (details["table"] == data[i]["name"]):
                    table_index = i
                    break

            #go to row number and do stuff
            if details["action"] == "add":
                size = len(data[table_index])
                data[table_index]["row_data"][size] = details["obj"] 

            if details["action"] == "modify":
                data[table_index]["row_data"][details["row_index"]] = details["obj"] 
            
            if details["action"] == "remove":
                del data[table_index]["row_data"][details["row_index"]]

            item = data_wrapper
        
        with open('./assets/' + file + '.json', 'w') as f:
            obj = json.dump(item, f)

class GetResource(Resource):
    def get(self, file):
        #print(file)

        data = None
        with open('./assets/' + file +'.json') as json_file:
            data = json.load(json_file)

        #print(data)
        return jsonify(data)

class GetJobs(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        filters = json_data['filters']

        #df = None
        data = None 
        metadata = None
        
        print(filters)

        with open('./assets/job-data.json') as mfile:
            metadata = json.load(mfile)

        with open('./assets/all-jobs.json') as json_file:
            data = json.load(json_file)

            if (len(filters) > 0):
                result_data = []

                for job in data["data"]:
                    
                    jobMetdata = None 
                    id = job['JOBSUBJOBID']

                    for obj in metadata:
                        if (obj["jobsubjobid"] == '"' + id + '"'):
                            jobMetdata = obj

                    passesFilters = False

                    for filter in filters:    
                        if (filter["key"] in jobMetdata) and (jobMetdata[filter["key"]] == filter["value"]):
                            passesFilters = True
                        else: 
                            passesFilters = False
                            break
                        
                    if passesFilters == True:
                        result_data.append(job)

                data["data"] = result_data

            data["data"] = data["data"][json_data["start"]:(json_data["start"] + json_data["count"])]

        return jsonify(data)



api.add_resource(UpdateJob, '/update-job') # Route_1
api.add_resource(UpdateChannel, '/update-channel') # Route_1
api.add_resource(GetResource, '/get-resource/<file>') # Route_1
api.add_resource(GetJobs, '/jobs/') # Route_1
#api.add_resource(AddJobClassad, '/add-job-classad') # Route_1

if __name__ == '__main__':
     app.run(host="131.225.154.146", port='5002', ssl_context=('/etc/cloud-security/fermicloud013.fnal.gov-hostcert.pem','/etc/cloud-security/fermicloud013.fnal.gov-hostkey.pem'))
