import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHighestComponent } from './list-highest.component';

describe('ListHighestComponent', () => {
  let component: ListHighestComponent;
  let fixture: ComponentFixture<ListHighestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHighestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHighestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
