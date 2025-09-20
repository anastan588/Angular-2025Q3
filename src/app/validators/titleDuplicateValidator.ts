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
export class titleDuplicateValidator {
  validateTitle(idControl: AbstractControl): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      const idToCheck: string = idControl.value;

      const isPascalCase = /^([A-Z][a-z0-9]+)*[A-Z][a-z0-9]*$/.test(
        control.value,
      );
      if (!isPascalCase) {
        return of({ invalidPascalCase: true });
      }
      console.log(
        this.toKebabCase(control.value).toLowerCase(),
        idToCheck.toLowerCase(),
        'title',
      );
      return of(control.value).pipe(
        switchMap((value) => {
          const kebabCaseValue = this.toKebabCase(value);
          const titleDuplicate =
            kebabCaseValue.toLowerCase() === idToCheck.toLowerCase();

          return of(!titleDuplicate ? { duplicate: true } : null);
        }),
        catchError(() => of(null)),
      );
    };
  }

  toKebabCase(str: string): string {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .trim();
  }
}
