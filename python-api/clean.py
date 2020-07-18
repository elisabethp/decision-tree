import pandas as pd
import json, sys

json_obj = None
df = None
item = None

#if for a channel,

#if for a job,
with open('./assets/job-data.json') as json_file:
    id = '"34588911.0@jobsub01.fnal.gov"'
    key = "accountinggroup"
    value = 'ooooooooooops'

    data = json.load(json_file)
    df = pd.DataFrame(data)
    df.set_index('jobsubjobid', inplace=True)
    #print(df['jobsubjobid'])
    #print(df.loc['10052068.0@jobsub03.fnal.gov'])
    print(df)
    df.loc[df.index == id, 'okokok'] = "noooo"
    df.loc[df.index == id, 'kkkkkkx'] = "noooo"

    print(df.loc[df.index == id]['okokok'])
    print(df.at[id, 'okokok'])
    #print(df)
    df.to_json('okkkkkkkk.json', orient='records')

    #df.loc[df['jobsubjobid'] == id, [key]] = value

    #item = [{**x[i]} for i, x in df.stack().groupby(level=0)]

#with open('job-data.json', 'w') as f:
    #json.dump(item, f)


#df.to_json('job-data-copy.json', orient='records')

#df = pd.DataFrame(data)
#print(df.loc[df['accountinggroup'] == 'noooooo'])
