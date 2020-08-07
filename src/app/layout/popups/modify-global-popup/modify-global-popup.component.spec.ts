import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyGlobalPopupComponent } from './modify-global-popup.component';

describe('ModifyGlobalPopupComponent', () => {
  let component: ModifyGlobalPopupComponent;
  let fixture: ComponentFixture<ModifyGlobalPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyGlobalPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyGlobalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
