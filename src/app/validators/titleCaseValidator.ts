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
export class titleCaseValidator {
  validateTitle(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      const isPascalCase = /^([A-Z][a-z0-9]+)*[A-Z][a-z0-9]*$/.test(
        control.value,
      );
      if (!isPascalCase) {
        return of({ invalidPascalCase: true });
      }

      return of(null);
    };
  }
}
