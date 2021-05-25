import { Component } from '@angular/core';
import { MediatorPatternService } from '../../services/mediator-pattern.service';

@Component({
  selector: 'app-worker1',
  templateUrl: './worker1.component.html',
  styleUrls: ['./worker1.component.css']
})
export class Worker1Component {

  STATUS = ''
  jobList:string[] = [];

  constructor(private mediatorPatternService:MediatorPatternService) { 
    this.mediatorPatternService.worker1Jobs.subscribe((jobList)  => {
      this.jobList = jobList;
    });

    this.mediatorPatternService.worker1Status.subscribe((status)  => {
      this.STATUS = status;
    });
  }

  startjob() {
    this.mediatorPatternService.createJob(0);
  }


}
