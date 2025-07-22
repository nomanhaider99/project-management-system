import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-business',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class OnBoardingUserComponent {
  form: FormGroup
  
  constructor (private fb: FormBuilder) {
    this.form = this.fb.group({
      tagline: [''],
      description: ['']
    })
  }

  getControl (name: string) {
    return this.form.get(name) as FormControl;
  }

  submitForm () {
    console.log(this.form.value);
  }
}
