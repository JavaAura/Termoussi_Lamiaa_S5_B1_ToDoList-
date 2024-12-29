import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TcpSocketConnectOpts } from 'net';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  showTaskForm = false;
  taskToUpdate: Task | null = null;


  constructor() { }

  ngOnInit(): void { }

  toggleTaskForm() {
    console.log("toggle task in ")
    this.showTaskForm = !this.showTaskForm;
    this.taskToUpdate = null;
  }

  onTaskSaved(task: Task): void {
    if (this.taskToUpdate) {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
      }
    } else {
      this.tasks.push({ ...task, id: this.tasks.length + 1 });
    }
    this.toggleTaskForm();
  }

  onUpdateTask(task: Task) {
    this.showTaskForm = true;
    this.taskToUpdate = task;
  }


  onDeleteTask(task: Task): void {

  }
}
