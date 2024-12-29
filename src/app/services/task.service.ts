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

  updateTask(updatedTask: Task) {
    const currentTasks = this.tasksSource.value;
    const taskIndex = currentTasks.findIndex((task) => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      currentTasks[taskIndex] = updatedTask;
      this.tasksSource.next([...currentTasks]); 
    } else {
      console.warn('Task to update was not found.');
    }
  }

  deleteTask(taskId: number): void {
    const currentTasks = this.tasksSource.value;
    const updatedTasks = currentTasks.filter(task => task.id !== taskId);
    this.tasksSource.next(updatedTasks)
    console.log('task id: ',taskId)
    console.log('current tasks: ',currentTasks)
    console.log('updated tasks : ',updatedTasks)
  }
    
}
