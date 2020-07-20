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
#app.config['CORS_HEADERS'] = 'Content-Type'

class UpdateJob(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        source = json_data['source']
        details = json_data['details']
        item = None

        print(details)
        with open('./assets/job-data.json') as json_file:
            data = json.load(json_file)
            
            df = pd.DataFrame(data)
            df.set_index('jobsubjobid', inplace=True, drop=False)

            if details['key'] in df.columns:
                df.loc[df.index == details['id'], details['key']] = details['value']
            else:
                df[details['key']] = np.nan
                df.at[df.index == details['id'], details['key']] = details['value']
                ##df.loc[df.index == details['id'], details['key']] = details['value']
                print(details['value'])

            #df.loc[df['jobsubjobid'] == details['id'], [details['key']]] = details['value']
            #item = [{**x[i]} for i, x in df.stack().groupby(level=0)]
            df.to_json('./assets/job-data.json', orient='records')

        #with open('./assets/job-data.json', 'w') as f:
        #    json.dump(item, f)

class UpdateChannel(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        source = json_data['source']
        details = json_data['details']

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
            #df = pd.DataFrame(data['data'])
            
            '''
            if (len(filters) > 0) {
                with open('./assets/job-data.json') as json_file:
                    data = json.load(json_file)
                    df = pd.DataFrame(data['data'])
                    
                    for filter in filters:
                        print(filter)
                        df = df.loc[df[filter["key"]] == filter["value"]]
            }
            '''

            if (len(filters) > 0):
                result_data = []

                for job in data["data"]:
                    
                    #print(metadata)
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
     app.run(host="http://131.225.76.42/", port='5002')