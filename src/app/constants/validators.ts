import { AbstractControl, ValidationErrors } from '@angular/forms';

export const REGEX = {
  NoWhitespaceRegExp: new RegExp('\\S'),
  ONLY_NUMBER: /^\d+$/,
  ONLY_ALPHABET: /^[a-zA-Z ]*$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
};

export function patternValidator(
  regex: RegExp,
  errorKey: string
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      // if control is empty return null
      return null;
    }

    // test the value of the control against the regexp
    const valid = regex.test(control.value);

    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? null : { [errorKey]: true };
  };
}
