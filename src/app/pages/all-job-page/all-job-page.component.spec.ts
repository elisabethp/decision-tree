import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJobPageComponent } from './all-job-page.component';

describe('AllJobPageComponent', () => {
  let component: AllJobPageComponent;
  let fixture: ComponentFixture<AllJobPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllJobPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllJobPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
