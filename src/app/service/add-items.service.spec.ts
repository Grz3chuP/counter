import { TestBed } from '@angular/core/testing';

import { AddItemsService } from './add-items.service';

describe('AddItemsService', () => {
  let service: AddItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
