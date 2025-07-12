import { Component, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent {
  @Input() placeholder: string = "";
  @Input() type: string = "text";
  @Input() name?: string = "";
  inputValue: string = "";
  @Output() value = "";
  isPasswordShown = signal(false);

  showPassword () {
    this.isPasswordShown.update(current => !current);
  }

  handleChange(event: Event) {
    event.preventDefault();
    this.value = ((event.target as HTMLInputElement).value);
    console.log(this.value);
  }
}
