import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom Validator to ensure maxAmount is greater than minAmount.
 */
export function maxAmountValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const minAmount = control.parent?.get('minAmount')?.value;
    const maxAmount = control.value;
    if (minAmount && maxAmount && maxAmount <= minAmount) {
      return { maxAmountInvalid: true }; // Max amount should be greater than min amount
    }
    return null;
  };
}

/**
 * Custom Validator to ensure maxAge is greater than minAge.
 */
export function maxAgeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const minAge = control.parent?.get('minAge')?.value;
    const maxAge = control.value;
    if (minAge && maxAge && maxAge <= minAge) {
      return { maxAgeInvalid: true }; // Max age should be greater than min age
    }
    return null;
  };
}

/**
 * Custom Validator to ensure maxPolicyTerm is greater than minPolicyTerm.
 */
export function maxPolicyTermValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const minPolicyTerm = control.parent?.get('minPolicyTerm')?.value;
    const maxPolicyTerm = control.value;
    if (minPolicyTerm && maxPolicyTerm && maxPolicyTerm <= minPolicyTerm) {
      return { maxPolicyTermInvalid: true }; // Max policy term should be greater than min policy term
    }
    return null;
  };
}

export function planNameValidator(existingPlans: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && existingPlans.includes(control.value)) {
      return { planNameExists: true }; // Plan name already exists
    }
    return null;
  };
}

export function dateOfBirthValidator(control: AbstractControl): ValidationErrors | null {
  const today = new Date();
  const dob = new Date(control.value);

  // Check if the entered date is in the future
  if (dob > today) {
    return { futureDate: true };
  }

  // Calculate the age
  var age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  // Adjust the age if the current date is before the birth date in the current year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  // Check if the user is under 18
  if (age < 18) {
    return { underage: true };
  }

  return null; // Validation passed
}