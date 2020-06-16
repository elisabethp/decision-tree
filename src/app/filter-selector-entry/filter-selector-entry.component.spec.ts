import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSelectorEntryComponent } from './filter-selector-entry.component';

describe('FilterSelectorEntryComponent', () => {
  let component: FilterSelectorEntryComponent;
  let fixture: ComponentFixture<FilterSelectorEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSelectorEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSelectorEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
