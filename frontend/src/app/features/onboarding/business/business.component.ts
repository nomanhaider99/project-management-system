import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class OnBoardingBusinessComponent {
  form: FormGroup
  
  constructor (private fb: FormBuilder) {
    this.form = this.fb.group({
      tagline: [''],
      description: [''],
      address: ['']
    })
  }

  getControl (name: string) {
    return this.form.get(name) as FormControl;
  }

  submitForm () {
    console.log(this.form.value);
  }
}
