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
export class idDuplicateValidator {
  validateID(titleControl: AbstractControl): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      const titleToCheck: string = titleControl.value;
      const isKebabCase =
        /[A-Z]{2,}(?=[A-Z][a-z]+|\b)|[A-Z]?[a-z]+|[A-Z]|[0-9]+/gm.test(
          control.value,
        );
      if (!isKebabCase) {
        return of({ invalidKebabCase: true });
      }
      console.log(
        this.toPascalCase(control.value).toLowerCase(),
        titleToCheck.toLowerCase(),
        'id',
      );

      return of(control.value).pipe(
        switchMap((value) => {
          const pascalCaseValue = this.toPascalCase(value);
          const IdDuplicate =
            pascalCaseValue.toLowerCase() === titleToCheck.toLowerCase();
          console.log();
          return of(!IdDuplicate ? { duplicate: true } : null);
        }),
        catchError(() => of(null)),
      );
    };
  }

  toPascalCase(kebabString: string) {
    return kebabString
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}
