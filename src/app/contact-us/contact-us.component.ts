import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX, patternValidator } from '../constants/validators';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  isSubmitted: boolean = false;
  modelForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.modelForm = this._fb.group({
      name: [
        '',
        [
          Validators.required,
          patternValidator(REGEX.NoWhitespaceRegExp, 'space'),
          patternValidator(REGEX.ONLY_ALPHABET, 'alphabet'),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      mobile: [
        '',
        [Validators.required, Validators.pattern(REGEX.ONLY_NUMBER)],
      ],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  Submit() {
    debugger;
    this.isSubmitted = true;
    if (this.modelForm.invalid) {
      return;
    }
    if (
      this.modelForm.value.name &&
      !this.modelForm.value.name.match(REGEX.NoWhitespaceRegExp) &&
      !this.modelForm.value.name.match(REGEX.ONLY_ALPHABET)
    ) {
      return;
    }
    if (
      this.modelForm.value.email &&
      !this.modelForm.value.email.match(REGEX.EMAIL)
    ) {
      return;
    }
    if (
      this.modelForm.value.mobile &&
      !this.modelForm.value.mobile.match(REGEX.ONLY_NUMBER)
    ) {
      return;
    }
    if (!this.modelForm.value.subject) {
      return;
    }
    if (!this.modelForm.value.message) {
      return;
    }

    alert('Submitted successful.');
    this.isSubmitted = false;
    this.modelForm.controls['name'].setValue('');
    this.modelForm.controls['email'].setValue('');
    this.modelForm.controls['mobile'].setValue('');
    this.modelForm.controls['subject'].setValue('');
    this.modelForm.controls['message'].setValue('');
  }

  get frmCtrl() {
    return this.modelForm.controls;
  }
}
