import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Worker2Component } from './worker2.component';

describe('Worker2Component', () => {
  let component: Worker2Component;
  let fixture: ComponentFixture<Worker2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Worker2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Worker2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
