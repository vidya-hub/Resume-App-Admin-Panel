import { TestBed, inject } from '@angular/core/testing';

import { CustomeHttpService } from './custome-http.service';

describe('CustomeHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomeHttpService]
    });
  });

  it('should be created', inject([CustomeHttpService], (service: CustomeHttpService) => {
    expect(service).toBeTruthy();
  }));
});
