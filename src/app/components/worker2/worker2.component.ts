import { Component } from '@angular/core';
import { MediatorPatternService } from '../../services/mediator-pattern.service';

@Component({
  selector: 'app-worker2',
  templateUrl: './worker2.component.html',
  styleUrls: ['./worker2.component.css']
})
export class Worker2Component{

  STATUS = 'WAITING'
  jobCounter = 1;
  jobList:string[] = [];

  constructor(private mediatorPatternService:MediatorPatternService) { 
    this.mediatorPatternService.worker2Jobs.subscribe((jobList)  => {
      this.jobList = jobList;
    });

    this.mediatorPatternService.worker2Status.subscribe((status)  => {
      this.STATUS = status;
    });
  }

  startjob() {
    this.mediatorPatternService.createJob(1);
  }
}
