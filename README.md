# Decision Tree Overview

The objective of this project is to build a web application that allows DUNE users to:
* Read and Write the global state of the HEPCloud Decision Engine.
* Read and write job-specific parameters.
* Read Decision Engine data regarding cluster backend matching.

In order to:
* Create system transparency by opening the Decision Engine’s black-box.
* Provide users with more control over their job submissions. 

## Documentation
The [documentation](https://indico.fnal.gov/event/44309/contributions/190724/attachments/132042/162960/Petit_-_Bois_Elisabeth_Paper2.pdf) for this application is hosted on Fermilab's Indico instance.

## Development

### Fermicloud
The application lives within the path `/var/www/decision-tree`. To build this project for production, run `ng build --prod` within this folder. After a successful build, the site will run at https://fermicloud013.fnal.gov. This site is accessible only through the Fermilab VPN.

### Local
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 

## Development API
The sample Python API is located within the respository's `python-api` folder. 
* It requires at least Python 3.6 to run. 
* The API running on Fermicloud requires a valid cert and key to perform API requests.

You can use provided Fermilab security certificates located at the path `/etc/cloud-security`. If it seems the API is unresponsive after running for a period of time, it will need to be restarted (reason unknown -- possibly due to certificate expiration?).

# Support
For any questions, feel free to contact me at ebois3 [at] gatech.edu or hello [at] lissythe.dev.