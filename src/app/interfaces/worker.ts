import { BehaviorSubject } from 'rxjs';

export interface Worker {
    status:BehaviorSubject<string>;
    jobCounter:number;
    jobListSubject:BehaviorSubject<string[]>;
  
    getStatus():string;
  
    sendJob():void;
  
    doJob(job:string):void;
}
