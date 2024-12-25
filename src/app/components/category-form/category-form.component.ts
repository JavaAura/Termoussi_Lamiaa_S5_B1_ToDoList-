import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  categoryName: string = ''; // To hold the category name input
  categoryToUpdate: { name: string } | null = null;
  errorMessage: string = ''; 

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.history) {
      const navigationState = history.state['categoryToUpdate'];
      if (navigationState) {
        this.categoryToUpdate = navigationState;
        this.categoryName = this.categoryToUpdate?.name || ''; // Default to empty string if name is undefined
      }
    } else {
      console.log('History object not available');
    }
  }


  onSubmit() {
    if (this.categoryName) {
      try {
        if (this.categoryToUpdate) {
          // Update existing category
          this.categoryService.updateCategory(this.categoryToUpdate, this.categoryName);
          console.log('Category Updated:', this.categoryName);
        } else {
          // Add new category
          this.categoryService.addCategory({ name: this.categoryName });
          console.log('Category Added:', this.categoryName);
        }
        this.router.navigate(['categories']);
      } catch (error: any) {
        this.errorMessage = error.message; 
      }
    }
  }
}
