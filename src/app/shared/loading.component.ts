export class LoadingComponent {

    isLoaded:boolean; 
    notFound:boolean;
    serverError:boolean;

    isJobsLoaded:boolean;
    jobsNotFound:boolean;
    jobsServerError:boolean;

    constructor() {

        this.isLoaded = false;
        this.notFound = false; //doesn't apply here
        this.serverError = false;

        this.isJobsLoaded = false;
        this.jobsNotFound = false; //doesn't apply here
        this.jobsServerError = false;

    }
   
}