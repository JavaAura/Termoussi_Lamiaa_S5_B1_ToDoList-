import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
categoryName: string = ''; // To hold the category name input

  constructor(private categoryService: CategoryService,private router: Router) {}

  onSubmit() {
    if (this.categoryName) {
      this.categoryService.addCategory({ name: this.categoryName });
      console.log('Category Added:', this.categoryName);
 
      this.router.navigate(['categories']);
    }
  }
}
