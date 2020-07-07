import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDataPageComponent } from './global-data-page.component';

describe('GlobalDataPageComponent', () => {
  let component: GlobalDataPageComponent;
  let fixture: ComponentFixture<GlobalDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
