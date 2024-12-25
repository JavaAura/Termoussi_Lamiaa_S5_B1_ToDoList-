import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnInit {
  categories: { name: string }[] = [];

  constructor(private categoryService: CategoryService, private router: Router) { }
  ngOnInit(): void {
    // Subscribe to the categories observable to get the updated list
    this.categoryService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }
  onAddCategory() {
    this.router.navigate(['/category-form']);
  }
}
