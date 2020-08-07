
from json import dumps
import json

id = '"34588647.0@jobsub01.fnal.gov"'

found = False
data = None

with open('job-data.json') as json_file:
    data = json.load(json_file)

    print(len(data))
    for i in range(len(data)):
        if data[i]["jobsubjobid"] == id:
            found = True
            data = data[i]
            break

print(data)
