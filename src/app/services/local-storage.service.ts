import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    } else {
      console.log('we are running on the server');
    }
  }

  getItem(key: string): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    } else {
      console.log('we are running on the server');
      return null;
    }
  }

  removeItem(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    } else {
      console.log('we are running on the server');
    }
  }
}

// When you're rendering on the server, you do not have a browser and thus you do not have access to all the APIs that the browser provides,
// including localStorage.

// In JavaScript code that is running both on the server and on the client (browser),
// it is common practice to guard against with an if clause that checks if window is defined.
// “Window” is the root object provided by the browser for all the APIs that are provided by the browser.

// Example:
// try this:
// if (typeof window !== 'undefined') {
//     console.log('we are running on the client')
// } else {
//     console.log('we are running on the server');
// }

// first terminal log 'we are running on the server' (can't access local storage in this phase)
// then console in the browser log 'we are running on the server' when it go to the client side
