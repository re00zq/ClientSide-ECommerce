import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetDynamicStarsService {
  constructor() {}

  getDynamicStars(averageRating: number): {
    solid: number;
    half: boolean;
    empty: number;
  } {
    const solid = Math.floor(averageRating);
    const half = Math.round(averageRating) - solid ? true : false;
    const empty = 5 - Math.round(averageRating);

    return {
      solid,
      half,
      empty,
    };
  }
}
