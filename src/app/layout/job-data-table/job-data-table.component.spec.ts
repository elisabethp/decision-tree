import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDataTableComponent } from './job-data-table.component';

describe('JobDataTableComponent', () => {
  let component: JobDataTableComponent;
  let fixture: ComponentFixture<JobDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
