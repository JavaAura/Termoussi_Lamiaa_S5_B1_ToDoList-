import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TcpSocketConnectOpts } from 'net';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, FormsModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  showTaskForm = false;
  taskToUpdate: Task | null = null;
  filteredTasks: Task[] = [];
  searchQuery: string = '';


  constructor(private taskService: TaskService) { 
   
  }

  ngOnInit(): void { 
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  toggleTaskForm() {
    console.log("toggle task in ")
    this.showTaskForm = !this.showTaskForm;
    this.taskToUpdate = null;
  }

  onTaskSaved(task: Task): void {
    this.toggleTaskForm();
  }

  onUpdateTask(task: Task) {
    this.showTaskForm = true;
    this.taskToUpdate = task;
  }

  onDeleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);  
    }
  }
  
  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.filteredTasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      console.log(this.filteredTasks);
    } else {
      this.filteredTasks = this.tasks;  
    }
  }
}
