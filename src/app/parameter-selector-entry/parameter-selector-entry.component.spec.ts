import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterSelectorEntryComponent } from './parameter-selector-entry.component';

describe('ParameterSelectorEntryComponent', () => {
  let component: ParameterSelectorEntryComponent;
  let fixture: ComponentFixture<ParameterSelectorEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterSelectorEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterSelectorEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
