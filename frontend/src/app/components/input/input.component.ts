import { Component, Input, Output, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() placeholder: string = "";
  @Input() type: string = "text";
  @Input() name?: string = "";
  inputValue: string = "";
  @Output() value = "";
  
  handleChange(event: Event) {
    event.preventDefault();
    this.value = ((event.target as HTMLInputElement).value);
    console.log(this.value);
  }
}
