import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Card, DashBoardItem, Data } from '../data/types';

@Injectable({ providedIn: 'root' })
export class UniqueTitleValidator {
  validateTitle(dataToCheck: DashBoardItem[] | Data | Card[]): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      let existingTitles: string[];
      if ('tabs' in dataToCheck) {
        existingTitles = dataToCheck.tabs.map((tab) => tab.title);
      } else {
        existingTitles = dataToCheck.map((item) => item.title);
      }

      return of(control.value).pipe(
        switchMap((value) => {
          const titleExists = existingTitles.includes(value);
          return of(titleExists ? { unique: true } : null);
        }),
        catchError(() => of(null)),
      );
    };
  }
}
