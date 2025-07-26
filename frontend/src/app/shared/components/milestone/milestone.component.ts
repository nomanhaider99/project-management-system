import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';
import { TaskType } from 'src/app/core/types/tasks.types';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit, OnChanges {
  @Input() status: any;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() mielstoneNo: number = 1;
  @Input() milestone: string = '';
  @Input() project: string = '';
  @Input() projectId: any = '';
  @Input() milestoneId: any = '';
  @Input() tasks: TaskType[] = [];
  tasksService: TasksService = inject(TasksService);
  @Output() addTaskEmmiter = new EventEmitter<any>();
  @Input() addTaskValueToBeEmmited: any;

  value = {
    comp: 'view',
    project: this.project,
    milestone: this.milestoneId
  }


  onAddTaskClick (value: any) {
    this.addTaskEmmiter.emit(value);
  }

  fetchTasksOfMilestone () {
    this.tasksService.getTasksOfMilestone('68812f55f86f2829bbe494d8', '68823843204b0a6e7b785c0a')
    .subscribe({
      next: (res: any) => {
        this.tasks = res.data
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchTasksOfMilestone();
  }

  ngOnInit(): void {
    this.fetchTasksOfMilestone();
  }
}
