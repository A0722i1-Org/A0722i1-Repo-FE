import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUserUpdateComponent } from './employee-user-update.component';

describe('EmployeeUserUpdateComponent', () => {
  let component: EmployeeUserUpdateComponent;
  let fixture: ComponentFixture<EmployeeUserUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeUserUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
