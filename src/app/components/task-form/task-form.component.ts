import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() taskToUpdate: Task | null = null;
  @Output() taskFormToggled = new EventEmitter<void>();
  @Output() taskSaved = new EventEmitter<Task>();
  task: Task = this.getEmptyTask();
  categories: Category[] = [];
  errorMessage: string = ''; 
  show: boolean = false;
  // task: Task = {
  //   id: 0,
  //   title: '',
  //   description: '',
  //   dueDate: new Date(),
  //   priority: 'medium',
  //   status: 'notStarted',
  //   categoryName: '',
  // };
  constructor(private taskService: TaskService, private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.categoryService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
    if (this.taskToUpdate) {
      this.task = { ...this.taskToUpdate };
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToUpdate'] && changes['taskToUpdate'].currentValue) {
      this.task = { ...changes['taskToUpdate'].currentValue };  // Populate form fields if task is passed for update
    }
  }
  onSaveTask() {
    if (!this.task.title.trim()) {
      this.errorMessage = 'Task title is required.';
      return;
    }
    if (this.task.title) {

      try {
        if (this.taskToUpdate) {
          // Update existing task
          const updatedTask: Task = { ...this.task };
          this.taskService.updateTask(updatedTask);
          console.log('Task updated:', updatedTask);
          this.taskSaved.emit(updatedTask);
        } else {
          // Add a new task
          const newTask: Task = { ...this.task, id: Date.now() }; 
          this.taskService.addTask(newTask);
          console.log('Task added:', newTask);
          this.taskSaved.emit(newTask);
        }
        this.resetForm(); // Reset form after saving
      } catch (error: any) {
        this.errorMessage = error.message;
      }
    }
  }
 

  resetForm(): void {
    this.task = this.getEmptyTask(); 
  }

  toggleTaskForm(): void{
    this.taskFormToggled.emit();
  }
  private getEmptyTask(): Task {
    return {
      id: 0,
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium',
      status: 'notStarted',
      categoryName: '',
    };
  }
  
}
