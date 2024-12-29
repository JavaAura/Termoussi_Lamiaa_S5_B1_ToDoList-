import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';  
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
  })
  export class DashboardComponent implements OnInit {
    tasks: Task[] = [];  
    completedPercentage: number = 0;
    notCompletedPercentage: number = 0;
    overdueTasksCount: number = 0;

    constructor(private taskService: TaskService) { }

    ngOnInit(): void {
      this.taskService.tasks$.subscribe((tasks: Task[]) => {
        this.tasks = tasks;
        this.calculateStatistics();  
      });
    }

    calculateStatistics(): void {
      const totalTasks = this.tasks.length;
      if (totalTasks === 0) {
        this.completedPercentage = 0;
        this.notCompletedPercentage = 0;
        this.overdueTasksCount = 0;
        return;
      }

      // Calculate completed and not completed percentages
      const completedTasks = this.tasks.filter(task => task.status === 'completed').length;
      this.completedPercentage = (completedTasks / totalTasks) * 100;
      this.notCompletedPercentage = 100 - this.completedPercentage;

      // Calculate (tasks with due date passed and not completed)
      const currentDate = new Date();
      this.overdueTasksCount = this.tasks.filter(task => {
        return task.status !== 'completed' && new Date(task.dueDate) < currentDate;
      }).length;
    }
  }
