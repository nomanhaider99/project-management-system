import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class BusinessRegisterComponent {
  form: FormGroup

  constructor (private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  getControl (name: string) {
    return this.form.get(name) as FormControl;
  }

  submitForm () {
    console.log(this.form.value);
  }
}
