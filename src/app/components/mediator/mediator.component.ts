import { Component, OnInit } from '@angular/core';
import { MediatorPatternService } from '../../services/mediator-pattern.service'

@Component({
  selector: 'app-mediator',
  templateUrl: './mediator.component.html',
  styleUrls: ['./mediator.component.css']
})
export class MediatorComponent implements OnInit {

  jobList:string[] = [];

  constructor(
    private mediatorPatternService:MediatorPatternService
    ) {
      this.mediatorPatternService.mediatorJobQueue.subscribe((jobList) => {
        this.jobList = jobList;
      });
    }

  ngOnInit(): void {
  }

}
