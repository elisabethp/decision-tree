import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDataTableEntryComponent } from './job-data-table-entry.component';

describe('JobDataTableEntryComponent', () => {
  let component: JobDataTableEntryComponent;
  let fixture: ComponentFixture<JobDataTableEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDataTableEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDataTableEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
