import pandas as pd
import json, sys

json_obj = None
df = None
item = None

source = sys.argv[1]
details = sys.argv[2]

print(source)
print(details)

#if for a channel,

#if for a job,
if (source == "job"):
    with open('job-data.json') as json_file:
        id = '"34588911.0@jobsub01.fnal.gov"'
        key = "accountinggroup"
        value = 'noooooo'

        data = json.load(json_file)
        df = pd.DataFrame(data)
        df.loc[df['jobsubjobid'] == id, [details.new_key]] = details.new_value

        item = [{**x[i]} for i, x in df.stack().groupby(level=0)]

    with open('job-data.json', 'w') as f:
        json.dump(item, f)


#df.to_json('job-data-copy.json', orient='records')

#df = pd.DataFrame(data)
#print(df.loc[df['accountinggroup'] == 'noooooo'])
