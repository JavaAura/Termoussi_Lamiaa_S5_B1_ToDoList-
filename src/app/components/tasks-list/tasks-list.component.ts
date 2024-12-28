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
  
 

  constructor() { }

  ngOnInit(): void { }

  toggleTaskForm() {
    console.log("toggle task in ")
    this.showTaskForm = !this.showTaskForm;
  }

  onTaskSaved(task: Task): void {
    console.log('Task received:', task);
    this.tasks.push({ ...task, id: this.tasks.length + 1 }); 
    this.toggleTaskForm(); 
  }
  
  onUpdateTask(task: Task): void {

    this.showTaskForm = true;
  }

  onDeleteTask(task: Task): void {
  
  }
}
