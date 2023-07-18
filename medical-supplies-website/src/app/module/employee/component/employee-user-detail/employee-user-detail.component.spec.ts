import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUserDetailComponent } from './employee-user-detail.component';

describe('EmployeeUserDetailComponent', () => {
  let component: EmployeeUserDetailComponent;
  let fixture: ComponentFixture<EmployeeUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
