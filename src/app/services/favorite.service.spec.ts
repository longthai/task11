/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FavoriteService } from './favorite.service';

describe('FavoriteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteService]
    });
  });

  it('should ...', inject([FavoriteService], (service: FavoriteService) => {
    expect(service).toBeTruthy();
  }));
});
