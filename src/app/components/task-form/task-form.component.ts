import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  @Output() taskFormToggled = new EventEmitter<void>();
  @Output() taskSaved = new EventEmitter<Task>();
  categories: Category[] = [];
  errorMessage: string = ''; 
  show: boolean = false;
  task: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium',
    status: 'notStarted',
    categoryName: '',
  };
  constructor(private taskService: TaskService, private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.categoryService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSaveTask(): void {
    if (!this.task.title.trim()) {
      console.error('Task title is required.');
      return;
    }

    const addedTask = { ...this.task }; 
    this.taskService.addTask(addedTask); 
    console.log('Task Added:', addedTask);
    this.taskSaved.emit(addedTask); 
    this.resetForm();
  }

  resetForm(): void {
    this.task = {
      id: 0,
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium',
      status: 'notStarted',
      categoryName: '',
    };
  }

  toggleTaskForm(): void{
    this.taskFormToggled.emit();
  }

  
}
