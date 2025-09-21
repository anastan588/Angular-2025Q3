import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class duplicateValidator {
  validateDuplicate(id: string, title: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const pascalCaseValueTitle = control.value.title.toLowerCase();
      const kebabCaseValueId = this.toPascalCase(
        control.value.id,
      ).toLowerCase();
      const isDuplicate = pascalCaseValueTitle === kebabCaseValueId;
      return !isDuplicate ? { duplicate: true } : null;
    };
  }

  toPascalCase(kebabString: string) {
    return kebabString
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}
