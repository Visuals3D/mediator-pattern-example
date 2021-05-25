import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Worker1Component } from './worker1.component';

describe('Worker1Component', () => {
  let component: Worker1Component;
  let fixture: ComponentFixture<Worker1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Worker1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Worker1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
