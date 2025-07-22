import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class BusinessLoginComponent {
  form: FormGroup
  
  constructor (private fb: FormBuilder) {
    this.form = this.fb.group({
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
