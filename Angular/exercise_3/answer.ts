import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="doSubmit()">
        <input type="text" placeholder="email" formControlName="email">
        <input type="text" placeholder="name" formControlName="name">
        <input type="date" placeholder="birthday" formControlName="birthday">
        <input type="number" placeholder="zip" formControlName="zip">
        <input type="text" placeholder="city" formControlName="city">
        <button type="submit">Submit</button>
    </form>
  `
})
export class AppUserForm {

  @Output()
  event = new EventEmitter<{ email: string; name: string; birthday?: Date; address: { zip: number; city: string; }; }>();

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.maxLength(128)]],
      birthday: ['', [this.birthdayValidator]], // Optional
      zip: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]]
    });
  }

  doSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const userData = {
        email: formValue.email,
        name: formValue.name,
        birthday: formValue.birthday ? new Date(formValue.birthday) : undefined,
        address: {
          zip: formValue.zip,
          city: formValue.city
        }
      };
      this.event.emit(userData);
    }
  }

  private birthdayValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Valid if empty, as the field is optional
    }
    
    const today = new Date();
    const inputDate = new Date(control.value);
    return inputDate < today ? null : { dateNotPast: true };
  }

}