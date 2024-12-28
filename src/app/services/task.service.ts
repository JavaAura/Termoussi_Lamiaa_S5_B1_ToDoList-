import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksSource = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSource.asObservable();
  constructor() { }

  addTask(task: Task) {
    const currentTasks = this.tasksSource.value;
    this.tasksSource.next([...currentTasks, task]);
  }

  updateTask(updatedTask: Task): void {
  
  }

  deleteTask(taskToDelete: Task): void {
  
  }
}
