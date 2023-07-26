import { TestBed } from '@angular/core/testing';

import { CategoryHomeService } from './category-home.service';

describe('CategoryHomeService', () => {
  let service: CategoryHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
