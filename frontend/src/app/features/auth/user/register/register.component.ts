import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
  form: FormGroup;
  constructor (private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
    });
  }

  getControl (name: string) {
    return this.form.get(name) as FormControl;
  }
  
  submitForm () {
    console.log(this.form.value);
  }
}
