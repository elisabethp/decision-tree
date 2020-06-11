import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableEntryComponent } from './data-table-entry.component';

describe('DataTableEntryComponent', () => {
  let component: DataTableEntryComponent;
  let fixture: ComponentFixture<DataTableEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
