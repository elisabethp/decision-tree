import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPopupComponent } from './modify-popup.component';

describe('ModifyPopupComponent', () => {
  let component: ModifyPopupComponent;
  let fixture: ComponentFixture<ModifyPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
