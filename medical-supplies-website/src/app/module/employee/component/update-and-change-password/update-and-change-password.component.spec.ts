import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAndChangePasswordComponent } from './update-and-change-password.component';

describe('UpdateAndChangePasswordComponent', () => {
  let component: UpdateAndChangePasswordComponent;
  let fixture: ComponentFixture<UpdateAndChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAndChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAndChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
