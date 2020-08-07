import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyJobPopupComponent } from './modify-job-popup.component';

describe('ModifyJobPopupComponent', () => {
  let component: ModifyJobPopupComponent;
  let fixture: ComponentFixture<ModifyJobPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyJobPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyJobPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
