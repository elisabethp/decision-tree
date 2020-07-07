import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTableEntryComponent } from './select-table-entry.component';

describe('SelectTableEntryComponent', () => {
  let component: SelectTableEntryComponent;
  let fixture: ComponentFixture<SelectTableEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTableEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTableEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
