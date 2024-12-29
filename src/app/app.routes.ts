import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { NgModule } from '@angular/core';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent  },
    { path: 'tasks', component: TasksListComponent },
    { path: 'categories', component: CategoriesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule], 
})
export class AppRoutingModule {}