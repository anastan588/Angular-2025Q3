import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { DashBoardItem, Data } from '../data/types';

@Injectable({ providedIn: 'root' })
export class UniqueIDValidator {
  validateID(dataToCheck: DashBoardItem[] | Data): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      let existingID: string[];
      if ('tabs' in dataToCheck) {
        existingID = dataToCheck.tabs.map((tab) => tab.id);
      } else {
        existingID = dataToCheck.map((item) => item.id);
      }

      return of(control.value).pipe(
        switchMap((value) => {
          const IDExists = existingID.includes(value);
          return of(IDExists ? { unique: true } : null);
        }),
        catchError(() => of(null)),
      );
    };
  }
}
