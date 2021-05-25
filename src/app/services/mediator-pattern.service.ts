import { Injectable } from '@angular/core';
import { Worker } from '../interfaces/worker';
import { BehaviorSubject } from 'rxjs';



class WorkerManager {

  workerList:Worker[] = [];

  constructor() {}

  addWorker(worker:Worker) {
    this.workerList.push(worker);
  }

  getWorkerList():Worker[] {
    return this.workerList;
  } 
}

class ConcreteWorker implements Worker {
  status:BehaviorSubject<string>;
  jobCounter = 1;
  jobListSubject:BehaviorSubject<string[]>;
  workerId: number;
  mediator:Mediator;

  constructor(workerId:number, mediator:Mediator, jobListSubject:BehaviorSubject<string[]>, status:BehaviorSubject<string>) {
    this.workerId = workerId
    this.mediator = mediator
    this.jobListSubject = jobListSubject;
    this.status = status;
   }

  getStatus() {
    return this.status.getValue();
  }

  sendJob() {
    this.mediator.mediateJob('job-'+  this.jobCounter++ + '-worker:' + this.workerId);
  }

  doJob(job:string) {
    const processTime = Math.floor(Math.random() * (5000 - 2000) + 2000);
    const jobList = this.jobListSubject.getValue();
    jobList.push(job);
    this.status.next('BUSY');
    setTimeout(() => {
      jobList.splice(jobList.indexOf(job), 1);
      this.status.next('FREE');
      this.mediator.mediateResourceFree(this.workerId);
      this.jobListSubject.next(jobList);
    }, processTime);
    this.jobListSubject.next(jobList);
  }
}

class Mediator {
  
  workerManager:WorkerManager; 
  mediatorJobQueue:BehaviorSubject<string[]>;
  
  constructor(workerManager:WorkerManager, mediatorJobQueue:BehaviorSubject<string[]>) {
    this.workerManager = workerManager;
    this.mediatorJobQueue = mediatorJobQueue;
  }

  mediateResourceFree(workerId:number) {
    /* This is the bad thing that happends when events need to be handled.
        Can be solved by using Observers
    */
    const jobList = this.mediatorJobQueue.getValue();
    const job = jobList.pop()
    if (job) {
      this.workerManager.getWorkerList()[workerId].doJob(job);
    }
    
    this.mediatorJobQueue.next(jobList);
  }

  mediateJob(job:string) {
    const jobList = this.mediatorJobQueue.getValue();
    jobList.push(job);

    for (let worker of this.workerManager.getWorkerList()) {
      if (worker.getStatus() === 'FREE') {
        const job = jobList.pop()
        if (job) {
          worker.doJob(job);
        }
      }
    }
    this.mediatorJobQueue.next(jobList);
  }
}




@Injectable({
  providedIn: 'root'
})
export class MediatorPatternService {

  worker1Jobs:BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  worker2Jobs:BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  worker1Status:BehaviorSubject<string> = new BehaviorSubject<string>('FREE');
  worker2Status:BehaviorSubject<string> = new BehaviorSubject<string>('FREE');
  mediatorJobQueue:BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]); 
  workerManager:WorkerManager;
  mediator:Mediator;

  constructor() { 
    this.workerManager = new WorkerManager();
    this.mediator = new Mediator(this.workerManager, this.mediatorJobQueue);
    this.workerManager.addWorker(new ConcreteWorker(0, this.mediator, this.worker1Jobs, this.worker1Status));
    this.workerManager.addWorker(new ConcreteWorker(1, this.mediator, this.worker2Jobs, this.worker2Status));
  }

  createJob(workerId:number) {
    this.workerManager.getWorkerList()[workerId].sendJob();
  }

}
