import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDataPageComponent } from './job-data-page.component';

describe('JobDataPageComponent', () => {
  let component: JobDataPageComponent;
  let fixture: ComponentFixture<JobDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
