import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() taskNo: number = 1;
}
