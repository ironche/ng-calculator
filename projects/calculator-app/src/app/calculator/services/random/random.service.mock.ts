import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class RandomServiceMock {

  next(): Observable<string> {
    const min = 1;
    const max = 100;
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return of(`${rand}`);
    return of('');
  }
}
